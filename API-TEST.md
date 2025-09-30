# Taco Cloud API smoke tests

These `curl` snippets exercise the standalone Mongo-backed API. Run them after
booting the service on `http://localhost:8080`.

> Tip: Pipe responses through `jq` for readability (e.g. append `| jq`).

## 1. Seed core ingredients

```bash
curl -s -X POST http://localhost:8080/api/ingredients \
  -H "Content-Type: application/json" \
  -d '{"id":"FLTO","name":"Flour Tortilla","type":"WRAP"}'

curl -s -X POST http://localhost:8080/api/ingredients \
  -H "Content-Type: application/json" \
  -d '{"id":"GRBF","name":"Ground Beef","type":"PROTEIN"}'

curl -s -X POST http://localhost:8080/api/ingredients \
  -H "Content-Type: application/json" \
  -d '{"id":"CHED","name":"Cheddar","type":"CHEESE"}'
```

Verify the catalog:

```bash
curl -s http://localhost:8080/api/ingredients | jq
```

## 2. Design a taco

```bash
curl -s -X POST http://localhost:8080/api/design \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Carnivore",
        "ingredients": [
          {"id":"FLTO","name":"Flour Tortilla","type":"WRAP"},
          {"id":"GRBF","name":"Ground Beef","type":"PROTEIN"},
          {"id":"CHED","name":"Cheddar","type":"CHEESE"}
        ]
      }'
```

List the recent designs:

```bash
curl -s http://localhost:8080/api/design/recent | jq
```

## 3. Place an order

Use the taco returned above (including its generated `id`). Replace `TACO_ID`
below with that value.

```bash
curl -s -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
        "deliveryName": "Craig Walls",
        "deliveryStreet": "123 North Street",
        "deliveryCity": "Cross Roads",
        "deliveryState": "TX",
        "deliveryZip": "76227",
        "ccNumber": "4111111111111111",
        "ccExpiration": "10/25",
        "ccCVV": "321",
        "tacos": [
          {
            "id": "TACO_ID",
            "name": "Carnivore",
            "ingredients": [
              {"id":"FLTO","name":"Flour Tortilla","type":"WRAP"},
              {"id":"GRBF","name":"Ground Beef","type":"PROTEIN"},
              {"id":"CHED","name":"Cheddar","type":"CHEESE"}
            ]
          }
        ]
      }'
```

Check existing orders:

```bash
curl -s http://localhost:8080/api/orders | jq
```
