# ref

- https://www.youtube.com/watch?v=tpz-6Trd1UI

# import

```
mongoimport sales.json -d movieData -c sales --jsonArray --drop
```

```
mongoimport --uri mongodb+srv://the_mern_stack_user@cluster0.r27pb.mongodb.net/jobSearchApp -c jobs --jsonArray --drop --type json --file jobs.json
```

# export

```
mongoexport --uri mongodb+srv://the_mern_stack_user@cluster0.r27pb.mongodb.net/jobSearchApp --collection jobs -o jobs.json --jsonArray
```
