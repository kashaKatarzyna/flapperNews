# flapperNews

To start server:
  *npm start
  *go to local host 3000
  

curl testing commands:
1. Create new post:
    curl --data 'title=test&link=http://test.com' http://localhost:3000/posts
    
2. Next, we query the index route to insure it was saved:
    curl http://localhost:3000/posts
    
3. To test upvote route:
    curl -X PUT http://localhost:3000/posts/<POST ID>/upvote
    
4.  
