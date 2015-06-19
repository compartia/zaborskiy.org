use Rack::Static,
  :urls => ["/assets/images", "/assets/js", "/assets/css"],
  :root => "cars"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('cars/why_you_should_not_buy_a_car.html', File::RDONLY)
  ]
}