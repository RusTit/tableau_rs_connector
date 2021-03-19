use std::env;
use warp::Filter;
use log::{info};
use simple_logger::SimpleLogger;
extern crate dotenv;

use dotenv::dotenv;

const DEFAULT_HTTP_PORT: u16 = 3000;

fn get_http_port() -> u16 {
    let port = env::var("PORT");
    if let Ok(port) = port {
        let port = port.parse::<u16>();
        if let Ok(port) = port {
            return port;
        }
    }
    return DEFAULT_HTTP_PORT;
}

#[tokio::main]
async fn main() {
    SimpleLogger::new().init().unwrap();
    info!("Running app");
    dotenv().ok();
    let http_port = get_http_port();
    // GET /hello/warp => 200 OK with body "Hello, warp!"
    let hello = warp::path!("hello" / String)
        .map(|name| format!("Hello, {}!", name));

    info!("App is running on {}", http_port);
    warp::serve(hello)
        .run(([127, 0, 0, 1], http_port))
        .await;
}