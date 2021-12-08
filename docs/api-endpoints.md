# Endpoints

## GET `/foods`

- lists all foods if no query is provided
- filters foods if query is provided

### Query Params

- `category`
- `price`
- `calorie`

### Example

- Filter Foods Based On Category

```
curl --location --request GET '/foods?category=lunch'
```

Values For Category are: `breakfast`, `lunch` and `dinner`

- Filter Foods Based On Price

```
curl --location --request GET '/foods?price=mid'
```

Values For Price are: `low`, `mid` and `high`

- Filter Foods Based On calorie

```
curl --location --request GET '/foods?calorie='
```

Values For Price are: `500`, `1000`, `1500`, `2000` and `2500`

> you can merge those queries

- Filter Foods Based On All

```
curl --location --request GET '/foods?category=breakfast&price=low&calorie=1000'
```

## GET `/foods/:id`

Get individual food based on id

## POST `/foods`

### Body

Example:

> ### Note: All fields are required

```json
{
  "name": "test food",
  "ingredients": [
    { "name": "test ingredient 1", "price": 5 },
    { "name": "test ingredient 2", "price": 10 }
  ],
  "procedures": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At dignissimos atque velit tempora, veniam eveniet incidunt ea. Quia ut alias suscipit voluptates repellendus? Magni recusandae architecto sed quam odit ullam!",
  "category": "Lunch",
  "calorie": 1000
}
```
