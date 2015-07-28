use Rack::Static,
  :urls => ["/assets/img", "/assets/js", "/assets/css", "/assets/logo", "/assets/logo/fonts", "/assets/partials", "/mortgage.html", "/index.html", "/why_you_should_not_buy_a_car.html", "/gal/spb_metro_map.html"],
  :root => "cars",
  :bind => "0.0.0.0"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('cars/index.html', File::RDONLY)
  ]
}