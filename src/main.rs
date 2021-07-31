use log::info;
use std::env;
use warp::Filter;
// use simple_logger::SimpleLogger;
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
    DEFAULT_HTTP_PORT
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    // SimpleLogger::new().init().unwrap();
    pretty_env_logger::init();
    info!("Running app");
    let http_port = get_http_port();

    let proxy_route = warp::any()
        .and(warp::path("proxy"))
        // Only accept bodies smaller than 16kb...
        .and(warp::path::param::<String>())
        .map(|url: String| {
            info!("Url: {}", url);
            warp::reply::json(&url)
        });

    let public_directory = warp::fs::dir("public");

    let routes = proxy_route.or(public_directory);

    info!("App is running on {}", http_port);
    warp::serve(routes).run(([0, 0, 0, 0], http_port)).await;
}
