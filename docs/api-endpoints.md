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

Get food based on id

## POST `/foods`

### Body

Example:

> ### Note: All fields are required

```json
{
  "name": "test food",
  "price": 450,
  "ingredients": [
    {
      "name": "something",
      "price": 12,
      "amount": 25,
      "foodGroup": ["Carbohydrate", "Dietary Fat"]
    },
    {
      "name": "and another",
      "price": 20,
      "amount": 15,
      "foodGroup": ["Protein", "Fat"]
    },
    {
      "name": "someotherthing",
      "price": 10,
      "amount": 10,
      "foodGroup": ["Protein", "Mineral", "Vitamin"]
    }
  ],
  "procedures": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At dignissimos atque velit tempora, veniam eveniet incidunt ea. Quia ut alias suscipit voluptates repellendus? Magni recusandae architecto sed quam odit ullam!",
  "category": "Dinner",
  "calorie": 1000,
  "date": "2021-12-03T17:27:00.600Z",
  "imageUrl": "https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlzaCUyMHNhbGFkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}
```

## PUT `/foods/:id`

Update food based on id

## DELETE `/foods/:id`

Delete a food based on id
