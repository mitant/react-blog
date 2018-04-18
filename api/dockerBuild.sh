docker build --rm -t react-blog-api .
docker run --rm --name react-blog-api -ti -p 3000:3000 react-blog-api