use Rack::Static,
  :urls => ["/assets/img", "/assets/js", "/assets/css", "/assets/partials", "/mortgage.html"],
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