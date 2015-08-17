require 'rack/rewrite'
use Rack::Rewrite do
  r301 '/gal/deepdream.html',  '/deepdream/deepdream.html'
end

use Rack::Static,
:urls => ["/assets/img", "/assets/js", "/assets/css", "/assets/less", "/assets/logo", "/assets/logo/fonts", "/assets/partials", "/mortgage.html", "/index.html", "/why_you_should_not_buy_a_car.html", "/gal", "/deepdream"],
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