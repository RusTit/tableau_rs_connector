/* global tableau json2csv Papa */

//////////////////////// Test data URLs //////////////////////////////
// https://json-xml-wdc.keshiarose.repl.co/food.json                //
// https://json-xml-wdc.keshiarose.repl.co/orders.xml               //
// https://api.covid19india.org/data.json                           //
// https://covidtracking.com/api/v1/states/daily.json               //
//////////////////////////////////////////////////////////////////////

var cachedTableData; // Always a JSON object

var myConnector = tableau.makeConnector();

// Create the schemas for each table
myConnector.getSchema = function(schemaCallback) {
  var conData = JSON.parse(tableau.connectionData);
  var dataString = conData.dataString;
  var dataUrl = conData.dataUrl;
  var tables = conData.tables;
  var method = conData.method;
  var tableSchemas = [];
  
  	var obj = {
		dataString: dataString,
		dataUrl: dataUrl,
		method: method,
	};

  _retrieveJsonData(obj, function(jsonData) {
    for (var table in tables) {
      var tableData = _jsToTable(jsonData, tables[table].fields);
      var headers = tableData.headers;
      var cols = [];
      var aliases = [];

      function findFriendlyName(f, tryNum) {
        var names = f.split(".");
        var alias = names
          .slice(names.length - tryNum, names.length)
          .join(" ")
          .replace(/_/g, " ");
        if (!aliases.includes(alias)) {
          aliases.push(alias);
          return alias;
        } else {
          return findFriendlyName(f, tryNum + 1);
        }
      }

      for (var field in headers) {
        cols.push({
          id: field.replace(/\$/g, "attr").replace(/[^A-Za-z0-9_]/g, "_"),
          alias: findFriendlyName(field, 1),
          dataType: headers[field]
        });
      }

      var tableSchema = {
        id: table,
        alias: tables[table].alias,
        columns: cols
      };
      tableSchemas.push(tableSchema);
    }

    schemaCallback(tableSchemas);
  });
};

// add the data in manageable chunks
function chunkData(table, tableData){
  var row_index = 0;
  var size = 100;
  while (row_index < tableData.length){
    table.appendRows(tableData.slice(row_index, size + row_index));
    row_index += size;
    tableau.reportProgress("Getting row: " + row_index);
  }
}

// Get the data for each table
myConnector.getData = function(table, doneCallback) {
  var conData = JSON.parse(tableau.connectionData);
  var dataString = conData.dataString;
  var dataUrl = conData.dataUrl;
  var tables = conData.tables;
  var method = conData.method;
  var tableSchemas = [];
  
  	var obj = {
		dataString: dataString,
		dataUrl: dataUrl,
		method: method,
	};

  _retrieveJsonData(obj, function(rawData) {
    var currentTable = table.tableInfo.id;

    var tableData = _jsToTable(rawData, tables[currentTable].fields);
    var newRows = [];
	tableData.rows.forEach(function (row) {
    // for (var row of tableData.rows) {
      var newRow = {};
      for (var prop in row) {
        newRow[prop.replace(/\$/g, "attr").replace(/[^A-Za-z0-9_]/g, "_")] =
          row[prop];
      }
      newRows.push(newRow);
    });
    chunkData(table, newRows);
    doneCallback();
  });
};

tableau.connectionName = "JSON/XML Data";
tableau.registerConnector(myConnector);

// Gets data from URL or string. Always returns JSON data, even if XML input.
function _retrieveJsonData(obj, retrieveDataCallback) {
  var dataString = obj.dataString;
  var dataUrl = obj.dataUrl;
  var method = obj.method;
  var rawData = dataString;
  
  if (cachedTableData) {
	retrieveDataCallback(cachedTableData);
	return;
  }
  
  var successCallback = function(data) {
    cachedTableData = JSON.parse(data);
    retrieveDataCallback(cachedTableData);
  };

  new Promise(function (resolve) {
	  if (dataUrl) {
		var options = {
			method: method
		}
		$.ajax("/proxy/" + dataUrl, options)
		   .done(function (result) {
			if (result.error) {
				if (tableau.phase !== "interactive") {
					tableau.abortWithError(result.error);
				} else {
					_error(result.error);
				}
			} else {
				rawData = result.body;
			}
			resolve();
		   });
	  } else {
		  resolve();
	  }
  }).then(function () {
	  return new Promise(function (resolve) {
		  if (typeof rawData === "string" && rawData.trim().startsWith("<")) {
			  var formData = {
				  xml: rawData
			  }
			$.post("/xml", formData).done(function (data) {
				rawData = JSON.stringify(data);
				resolve();
			});
		  } else {
			resolve();
		  }			  
	  });
  }).then(function () {
	  successCallback(rawData);
  }).catch(function (error) {
	 console.error("_retrieveJsonData"); 
	 console.error(error);
  });
}

// Turns tabular data into json for Tableau input
function _csv2table(csv) {
  var lines = Papa.parse(csv, {
    delimiter: ",",
    newline: "\n",
    dynamicTyping: true
  }).data;
  var fields = lines.shift();
  var headers = {};
  var rows = [];

  fields.forEach(function (field) { headers[field] = {}; });

  lines.forEach(function (line) {
    var obj = {};
    for (var field in fields) {
      var header = headers[fields[field]];
      var value = line[field];

      if (
        value === "" ||
        value === '""' ||
        value === "null" ||
        value === null
      ) {
        obj[fields[field]] = null;
        header.null = header.null ? header.null + 1 : 1;
      } else if (value === "true" || value === true) {
        obj[fields[field]] = true;
        header.bool = header.bool ? header.bool + 1 : 1;
      } else if (value === "false" || value === false) {
        obj[fields[field]] = false;
        header.bool = header.bool ? header.bool + 1 : 1;
      } else if (typeof value === "object") {
        obj[fields[field]] = value.toISOString();
        header.string = header.string ? header.string + 1 : 1;
      } else if (!isNaN(value)) {
        obj[fields[field]] = value;
        if (parseInt(value) == value) {
          header.int = header.int ? header.int + 1 : 1;
        } else {
          header.float = header.float ? header.float + 1 : 1;
        }
      } else {
        obj[fields[field]] = value;
        header.string = header.string ? header.string + 1 : 1;
      }
    }
    rows.push(obj);
  });

  for (var field in headers) {
    // strings
    if (headers[field].string) {
      headers[field] = "string";
      continue;
    }
    // nulls
    if (Object.keys(headers[field]).length === 1 && headers[field].null) {
      headers[field] = "string";
      continue;
    }
    // floats
    if (headers[field].float) {
      headers[field] = "float";
      continue;
    }
    // integers
    if (headers[field].int) {
      headers[field] = "int";
      continue;
    }
    // booleans
    if (headers[field].bool) {
      headers[field] = "bool";
      continue;
    }
    headers[field] = "string";
  }

	var result = {
		headers: headers,
		rows: rows,
	};
  return result;
}

// Flattens out the JSON data to a  tabular format
function _jsToTable(data, fields) {
  var paths = new Set();
  fields.forEach(function (field) {
    var levels = field.split(".");
    for (var level in levels) {
      paths.add(levels.slice(0, +level + 1).join("."));
    }
  });
  paths = Array.from(paths);
  var transF = { paths: paths };
  var jsonData = {
    fields: fields,
    transforms: [json2csv.transforms.unwind(paths)]
  };
  var json2csvParser = new json2csv.Parser(jsonData);
  var csvData = json2csvParser.parse(data);
  return _csv2table(csvData);
}

// Grabs all the possible paths for properties in an object
function _objectToPaths(data) {
  var result = new Set();
  getPath(data, "");
  var paths = Array.from(result);
  return paths;

  function getPath(data, path) {
    if (data && typeof data === "object") {
      if (Array.isArray(data)) {
        for (var i in data) {
          getPath(data[i], path);
        }
      } else {
        for (var p in data) {
          getPath(data[p], path + p + ".");
        }
      }
    } else {
      path = path.split("");
      path.pop();
      result.add(path.join(""));
    }
  }
}

// Turns an array of object path names into an object for display
function _pathsToTree(paths) {
  var result = {};
  function makeTree(path, level) {
    var levels = path.split(".");
    var currentLevel = levels.slice(level, level + 1);

    if (level === 0) {
      if (!result[currentLevel]) result[currentLevel] = {};
    } else {
      var cur = result[levels[0]];
	  levels.slice(1, level + 1).forEach(function (c) {
        if (cur[c]) {
          cur = cur[c];
        } else {
          cur[c] = {};
        }
      });
    }
    if (level + 1 < levels.length) {
      makeTree(path, level + 1);
    }
  }
  paths.forEach(function (path) {
    makeTree(path, 0);
  });
  return result;
}

function _addTable() {
  var tableID = 0; // Scan highest table id number then +1
  $("input[data-tableid]").each(function() {
    tableID =
      $(this).data("tableid") > tableID ? $(this).data("tableid") : tableID;
  });
  tableID++;

  var tableTemplate = '<div class="table" data-tableid="${tableID}">' +
      '<p class="label">Table Name</p>' +
      '<div class="row">' +
        '<input data-tableid="' + tableID + '" type="text" placeholder="My Data (' + (tableID +
    1) + ')"/>' +
        '<button class="delete" data-tableid="' + tableID + '" onclick="_deleteTable(this)">Delete</button>' +
      '</div>' +
      '<div class="selections">' +
        '<span><a onclick="_selectAll(this)" data-tableid="' + tableID + '">Select All</a></span>' +
        '<span><a onclick="_clearAll(this)" data-tableid="' + tableID + '">Clear All</a></span>' +
      '</div>' +
      '<div class="fields" data-tableid="' + tableID + '">No data fields found</div>' +
    '</div>';

  $("#tables").append(tableTemplate);
  _askForFields(tableID);
}

function _deleteTable(e) {
  var tableID = $(e).data("tableid");
  var table = $(".table[data-tableid=" + tableID + "]");
  table.remove();
}

// Switches to field input form and displays potential fields
function _askForFields(tableID) {
    var conData = JSON.parse(tableau.connectionData);
    var dataString = conData.dataString;
    var dataUrl = conData.dataUrl;
    var method = conData.method;

    var div = $(".fields[data-tableid=" + tableID + "]");
    var fieldsTree;

	var obj = {
		dataString: dataString,
		dataUrl: dataUrl,
		method: method,
	};
    new Promise(function(resolve) {
        _retrieveJsonData(obj, function(rawData) {
            fieldsTree = _pathsToTree(_objectToPaths(rawData));
            resolve();
        });
    }).then(function() {
        if (!fieldsTree) return;

        var output = "";

        function displayFields(fields, spacing, parent) {
            for (var field in fields) {
                var showCheck = Object.keys(fields[field]).length === 0;
				  output += '<div class="field" onclick="' + (
					showCheck ? '_toggleCheck(this)' : '_toggleChildCheck(this)'
				  ) + '" data-checked="false" style="padding-left:' + spacing + 'px;" data-tableid="' + tableID + '" data-visible="' + showCheck + '" data-field="' + (
					(parent === '' ? '' : (parent + '.')) + field
				  ) + '">' +
					(
					  showCheck
						? '<div class="check"></div>'
						: '<div class="check nested"></div>'
					) +
					'<div class="fieldText" >' +
					  field +
					'</div>' +
				  '</div>';
                if (fields[field]) {
                    displayFields(
                        fields[field],
                        spacing + 10,
                        (parent === "" ? "" : parent + ".") + field
                    );
                }
            }
        }

        displayFields(fieldsTree, 0, "");

        div.html(output);
        $("#dataInput").css("display", "none");
        $("#fieldInput").css("display", "block");
    });
}

// Checks if JSON is parseable
function _checkJSONFormat(input) {
  input = input.trim();
  if (!input.startsWith("<")) {
    var dataJSON;
    try {
      dataJSON = JSON.parse(input);
    } catch (e) {
      dataJSON = JSON.parse(JSON.stringify(eval("(" + input + ")")));
    }
    return JSON.stringify(dataJSON);
  }
  return input;
}

// Grabs wanted fields and submits data to Tableau
function _submitDataToTableau() {
  var tables = {};

  // Make sure no duplicate table names
  $(".table").each(function() {
    var tableName = (
      $(this)
        .find("input[data-tableid]")
        .val() || "My Data"
    ).trim();
    var tableID = $(this)
      .find("input[data-tableid]")
      .data("tableid");
    var tableTableauID = tableName.replace(/[^A-Za-z0-9_]/g, "_");
    function createUniqueID(tableTableauID, tryNum) {
      var tryText = tryNum ? "_" + (tryNum + 1) : "";
      tables.hasOwnProperty(tableTableauID + tryText)
        ? createUniqueID(tableTableauID, tryNum + 1)
        : (tables[tableTableauID + tryText] = {
          id: tableID,
          alias: tableName + tryText
        });
    }
    createUniqueID(tableTableauID, null);
  });

  for (var table in tables) {
    var fields = [];
    $(".field[data-tableid=" + tables[table].id + "]").each(function() {
      if ($(this).data("visible") && $(this).data("checked") === "true") {
        fields.push($(this).data("field"));
      }
    });
    tables[table]["fields"] = fields;
  }

  var fieldCount = 0;
  for (var table in tables) {
    tables[table].fields.length === 0 ? delete tables[table] : fieldCount++;
  }

  if (fieldCount > 0) {
    var conData = JSON.parse(tableau.connectionData);
	conData.tables = tables;
    tableau.connectionData = JSON.stringify(conData);
    tableau.submit();
  } else {
    _error("No fields selected.");
  }
}

// Toggles checkedness of field
function _toggleCheck(e) {
  var checked = $(e).data("checked") === "true";
  $(e).data("checked", checked ? "false" : "true");
  $(e)
    .find(".check")
    .toggleClass("checked");
}

// Toggles checkedness for all fields under a parent
function _toggleChildCheck(e) {
  var parentTableID = $(e).data("tableid");
  var parentField = $(e).data("field");
  var children = $("#tables").find(
    '[data-tableID="' + parentTableID + '"][data-field^="' + parentField + '"][data-field!="' + parentField + '"]'
  );
  var childCount = children.length;
  var checkedCount = children.filter(function(i) {
    return $(this).data("checked") === "true";
  }).length;

  children.each(function() {
    if (childCount === checkedCount) {
      $(this).data("checked", "false");
      $(this)
        .find(".check")
        .removeClass("checked");
    } else {
      $(this).data("checked", "true");
      $(this)
        .find(".check")
        .addClass("checked");
    }
  });
}

// Selects all fields
function _selectAll(e) {
  var tableID = $(e).data("tableid");
  $(".field[data-tableid=" + tableID + "]").each(function() {
    $(this).data("checked", "true");
    $(this)
      .find(".check")
      .addClass("checked");
  });
}

// Clears all checked fields
function _clearAll(e) {
  var tableID = $(e).data("tableid");
  $(".field[data-tableid=" + tableID + "]").each(function() {
    $(this).data("checked", "false");
    $(this)
      .find(".check")
      .removeClass("checked");
  });
}

// Takes data, does basic vaildation and goes to field selection phase
function _next(dataString) {
  dataString = (dataString || $("#paste").val()).trim();
  var dataUrl = $("#url")
    .val()
    .trim();
  var method = $("#method").val();
  if (!dataString && !dataUrl) return _error("No data entered.");

  if (dataString) {
    if (!dataString.startsWith("<")) {
      try {
        JSON.parse(_checkJSONFormat(dataString));
      } catch (e) {
        return _error("Data entered is not valid JSON.");
      }
    }

    if (dataString.startsWith("<")) {
      try {
        var xmlDoc = $.parseXML(dataString);
      } catch (err) {
        return _error("Data entered is not valid XML.");
      }
    }
  }

  if (dataUrl) {
    var urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    var result = dataUrl.match(urlRegex);
    if (result === null) return _error("URL is not valid.");
  }

  if (dataString) dataString = _checkJSONFormat(dataString);
  var saveObj = { dataString: dataString, dataUrl: dataUrl, method: method };
  tableau.connectionData = JSON.stringify(saveObj);

  _askForFields(0);
}

// Shows error message below submit button
function _error(message) {
  $(".error")
    .fadeIn("fast")
    .delay(3000)
    .fadeOut("slow");
  $(".error").html(message);
  $("html, body").animate({ scrollTop: $(document).height() }, "fast");
}

// All of the below handles draging and dropping files
function cancel(e) {
  e.stopPropagation();
  e.preventDefault();
}

$(document)
  .on("dragenter", cancel)
  .on("drop", cancel)
  .on("dragover", function(e) {
    cancel(e);
    $("#dragdrop").css("border", "2px dashed #FE6568");
  })
  .on("dragleave", function(e) {
    cancel(e);
    $("#dragdrop").css("border", "2px dashed #CCC");
  });

$("#dragdrop")
  .on("dragenter", cancel)
  .on("dragover", function(e) {
    cancel(e);
    $(this).css("border", "2px solid #FE6568");
    $(this).css("background-color", "#FFCECF");
  })
  .on("dragleave", function(e) {
    cancel(e);
    $(this).css("border", "2px dashed #CCC");
    $(this).css("background-color", "#FFFFFF");
  })
  .on("drop", function(e) {
    cancel(e);
    $(this).css("border", "2px dashed #CCC");
    $(this).css("background-color", "#FFFFFF");
    var files = e.originalEvent.dataTransfer.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      _next(reader.result);
    };
    reader.readAsText(file);
  });
