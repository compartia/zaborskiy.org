cd assets
lessc -verbose -x --strict-imports less/tutorial.less css/tutorial.css
lessc -verbose -x --strict-imports less/zaborskiy.less css/zaborskiy.css
lessc -verbose -x --strict-imports less/cv.less css/cv.css

lessc -verbose -x --strict-imports less/artem-patch.less css/cars.css


cd ..
#cd neural
#git fetch
#cd ..
git submodule foreach git pull origin master
cp neural/* gal/

