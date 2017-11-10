---
title: API de Serviços TEM

language_tabs: # must be one of https://git.io/vQNgJ
  - php

toc_footers:
  - <a href='https://meutem.com.br'>Documentation Produzida por Tem.</a>

search: true
---

# Introdução

Esse documento tem como finalidade descrever os serviços que compoem a API de Serviços da TEM assim como suas respostas.

# Autenticação

A utilização de alguns serviços está condicionada a informar no cabeçalho da requisição uma chave válida alfanumérica de 50 caracteres válida ppor meio do parâmetro Transaction-key.

`Transaction-key: njRRmvsxpZ******************************s7rbscHNmL`

# Credenciados

## Obter Detalhes

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'health-unit/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
  "id": "1",
  "type": "CLINICA",
  "name": "CLINICA EXEMPLO",
  "cpf_cnpj": "99999999999999",
  "telephone_1": "(99) 9999-9999",
  "telephone_2": "(99) 99999-9999",
  "email": "CLINICAEXEMPLO@GMAIL.COM",
  "rede": "TEM",
  "is_active": "1",
  "created_at": "2017-06-29 09:32:31",
  "updated_at": "2017-07-05 09:32:30",
  "deleted_at": null,
  "postal_code": "99999-999",
  "latitude": null,
  "longitude": null,
  "specialties": [
    {
      "id": "3",
      "name": "DERMATOLOGIA",
      "created_at": "2016-02-15 01:29:14",
      "updated_at": null,
      "deleted_At": null
    },
    {
      "id": "5",
      "name": "CLINICA MEDICA",
      "created_at": "2016-02-15 01:29:14",
      "updated_at": null,
      "deleted_At": null
    },
    {
      "id": "6",
      "name": "GASTROENTEROLOGIA",
      "created_at": "2016-02-15 01:29:14",
      "updated_at": null,
      "deleted_At": null
    }
  ]
}
```

Utilize esse serviço para buscar detalhes de um determinado credenciado.

### Requisição HTTP

`GET https://api.meutem.dev/health-unit/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID do credenciado a ser obtido

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca por Filtro

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$parametros = [
                'specialties'  => 1,
                'state'        => 'se',
                'city'         => 'aracaju',
                'neighborhood' => 'centro'
              ];
$url = 'health-units/search-units-filter/20/0?' . http_build_query($parametros);

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
  "data": [
    {
      "DT_RowId": "1",
      "id": "1",
      "specialty": "ALERGIA E IMUNOLOGIA",
      "name": "Exemplo 1",
      "city": "ARACAJU",
      "neighborhood": "CENTRO",
      "state": "SE",
      "zone": "SE - Capital"
    },
    {
      "DT_RowId": "2",
      "id": "2",
      "specialty": "ALERGIA E IMUNOLOGIA",
      "name": "Exemplo 2",
      "city": "ARACAJU",
      "neighborhood": "CENTRO",
      "state": "SE",
      "zone": "SE - Capital"
    }
  ]
}
```

Utilize esse serviço para buscar todos os credenciados a partir de filtro construído.

### Requisição HTTP

`GET https://api.meutem.dev/health-units/search-units-filter/[limit]/[offset]?specialties=[especialidade_id]&state=[uf]&city=[cidade]&neighborhood=[bairro]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
limit | Number | Sim | Limite para a pesquisa (max: 50)
offset | String | Sim | Offset para a pesquisa

### Parâmetros de Consulta

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
especialidade_id | Number | Não | Id da especialidade desejada
uf | String | Não | Sigla do estado (ex. BA)
cidade | String | Não | Nome da cidade
bairro | String | Não | Nome do bairro

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca por Palavra-chave

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'health-units/search-units/20/0?parameters=aracaju';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
  "data": [
    {
      "DT_RowId": "1",
      "id": "1",
      "specialty": "ALERGIA E IMUNOLOGIA",
      "name": "Exemplo 1",
      "city": "ARACAJU",
      "neighborhood": "CENTRO",
      "state": "SE",
      "zone": "SE - Capital"
    },
    {
      "DT_RowId": "2",
      "id": "2",
      "specialty": "ALERGIA E IMUNOLOGIA",
      "name": "Exemplo 2",
      "city": "ARACAJU",
      "neighborhood": "CENTRO",
      "state": "SE",
      "zone": "SE - Capital"
    }
  ]
}
```

Utilize esse serviço para buscar todos os credenciados a partir de uma palavra-chave passada como parâmetro de consulta.

### Requisição HTTP

`GET https://api.meutem.dev/health-units/search-units/[limit]/[offset]?parameters=[parameters]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
limit | Number | Sim | Limite para a pesquisa (max: 50)
offset | String | Sim | Offset para a pesquisa

### Parâmetros de Consulta

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
parameters | String | Sim | Palavra-chave que filtra nome, especialidade, bairro, cidade, uf ou zona

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca de Especialidades

Utilize esse serviço para buscar todas as especialidades dos credenciados cadastrados

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'health-units-specialties';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "name": "ACUIDADE VISUAL",
    "id": "545"
  },
  {
    "name": "ACUPUNTURA",
    "id": "21"
  },
  {
    "name": "VIDEOLAPAROSCOPIA",
    "id": "470"
  },
  {
    "name": "VIDEOLARINGOSCOPIA",
    "id": "391"
  }
]
```

`GET https://api.meutem.dev/health-units-specialties`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca de Estados

Utilize esse serviço para buscar todos os estados onde existem credenciados.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'health-units-states';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "state": "AC"
  },
  {
    "state": "AL"
  },
  {
    "state": "SP"
  },
  {
    "state": "TO"
  }
]
```

`GET https://api.meutem.dev/health-units-states`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca de Cidades

Utilize esse serviço para buscar todas as cidades de um determinado estado, passado por parâmetro, onde existem credenciados.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'health-units-cities/se';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "city": "ARACAJU"
  }
]
```

`GET https://api.meutem.dev/health-units-cities/[uf]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
uf | String | Sim | Sigla do estado (ex. BA)

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca de Bairros

Utilize esse serviço para buscar todOs os bairros de uma determinada cidade, passada por parâmetro, onde existem credenciados.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'health-units-neighborhoods/se/aracaju';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "neighborhood": "CENTRO"
  },
  {
    "neighborhood": "JARDINS"
  },
  {
    "neighborhood": "SANTO ANTÔNIO"
  },
  {
    "neighborhood": "SÃO JOSÉ"
  },
  {
    "neighborhood": "TREZE DE JULHO"
  }
]
```

`GET https://api.meutem.dev/health-units-neighborhoods/[uf]/[cidade]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
uf | String | Sim | Sigla do estado (ex. BA)
cidade | String | Sim | Nome da cidade

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

# Farmácias

## Obter Detalhes

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'drugstore/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
  "id": "1",
  "name": "Exemplo",
  "address": "AV. EXEMPLO",
  "number": "123",
  "neighborhood": "CENTRO",
  "city": "MACEIO",
  "state": "AL",
  "postal_code": "57055000",
  "telephone": "(99) 9999-9999",
  "latitude": "-9.64430510",
  "longitude": "-35.73990940",
  "created_at": "2017-10-04 08:00:02"
}
```

Utilize esse serviço para buscar detalhes de uma determinada farmárcia.


### Requisição HTTP

`GET https://api.meutem.dev/drugstore/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID da farmárcia a ser obtido

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

## Busca por Filtro

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$parametros = [
                'state'        => 'se',
                'city'         => 'aracaju',
                'neighborhood' => 'centro'
              ];
$url = 'drugstores/search-units-filter/20/0?' . http_build_query($parametros);

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "data": [
        {
            "DT_RowId": "1",
            "id": "1",
            "name": "FARMACIA EXEMPLO",
            "address": "R. EXEMPLO",
            "number": "123",
            "neighborhood": "CENTRO",
            "city": "ARACAJU",
            "state": "SE",
            "postal_code": "49000000",
            "latitude": "-10.91109890",
            "longitude": "-37.04995800",
            "created_at": "2017-10-04 08:00:02"
        },
        {
            "DT_RowId": "2",
            "id": "2",
            "name": "FARMACIA EXEMPLO 2",
            "address": "AV. EXEMPLO 2",
            "number": "123",
            "neighborhood": "CENTRO",
            "city": "ARACAJU",
            "state": "SE",
            "postal_code": "49000000",
            "latitude": "-10.91849890",
            "longitude": "-37.05105620",
            "created_at": "2017-10-04 08:00:07"
        }
    ]
}
```

Utilize esse serviço para buscar todos as farmácias a partir de filtro construído.

### Requisição HTTP

`GET https://api.meutem.dev/drugstores/search-units-filter/[limit]/[offset]?state=[uf]&city=[cidade]&neighborhood=[bairro]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
limit | Number | Sim | Limite para a pesquisa (max: 50)
offset | String | Sim | Offset para a pesquisa

### Parâmetros de Consulta

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
uf | String | Não | Sigla do estado (ex. BA)
cidade | String | Não | Nome da cidade
bairro | String | Não | Nome do bairro

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

## Busca por Palavra-chave

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'drugstores/search-units/20/0?parameters=aracaju';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
  "data": [
    {
      "DT_RowId": "1",
      "id": "1",
      "specialty": "AUDIOMETRIA",
      "name": "EXEMPLO 1",
      "city": "ARACAJU",
      "neighborhood": "SÃO JOSÉ",
      "state": "SE",
      "zone": "",
      "latitude": "-10.91892210",
      "longitude": "-37.05267520"
    },
    {
      "DT_RowId": "2",
      "id": "2",
      "specialty": "COLONOSCOPIA",
      "name": "EXEMPLO 2",
      "city": "ARACAJU",
      "neighborhood": "SÃO JOSÉ",
      "state": "SE",
      "zone": "SE - Capital",
      "latitude": "-10.91922000",
      "longitude": "-37.05157170"
    }
  ]
}
```

Utilize esse serviço para buscar todos as farmácias a partir de uma palavra-chave passada como parâmetro de consulta.

### Requisição HTTP

`GET https://api.meutem.dev/drugstores/search-units/[limit]/[offset]?parameters=[parameters]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
limit | Number | Sim | Limite para a pesquisa (max: 50)
offset | String | Sim | Offset para a pesquisa

### Parâmetros de Consulta

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
parameters | String | Sim | Palavra-chave que filtra nome, especialidade, bairro, cidade, uf ou zona

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

## Busca de Especialidades

Utilize esse serviço para buscar todas as especialidades as farmácias cadastrados

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'drugstores-specialties';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "name": "ACUIDADE VISUAL",
    "id": "545"
  },
  {
    "name": "ACUPUNTURA",
    "id": "21"
  },
  {
    "name": "VIDEOLAPAROSCOPIA",
    "id": "470"
  },
  {
    "name": "VIDEOLARINGOSCOPIA",
    "id": "391"
  }
]
```

`GET https://api.meutem.dev/drugstores-specialties`

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

## Busca de Estados

Utilize esse serviço para buscar todos os estados onde existem credenciados.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'drugstores-states';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "state": "AC"
  },
  {
    "state": "AL"
  },
  {
    "state": "SP"
  },
  {
    "state": "TO"
  }
]
```

`GET https://api.meutem.dev/drugstores-states`

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

## Busca de Cidades

Utilize esse serviço para buscar todas as cidades de um determinado estado, passado por parâmetro, onde existem credenciados.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'drugstores-cities/se';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "city": "ARACAJU"
  }
]
```

`GET https://api.meutem.dev/drugstores-cities/[uf]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
uf | String | Sim | Sigla do estado (ex. BA)

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

## Busca de Bairros

Utilize esse serviço para buscar todOs os bairros de uma determinada cidade, passada por parâmetro, onde existem credenciados.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'drugstores-neighborhoods/se/aracaju';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "neighborhood": "CENTRO"
  },
  {
    "neighborhood": "JARDINS"
  },
  {
    "neighborhood": "SANTO ANTÔNIO"
  },
  {
    "neighborhood": "SÃO JOSÉ"
  },
  {
    "neighborhood": "TREZE DE JULHO"
  }
]
```

`GET https://api.meutem.dev/drugstores-neighborhoods/[uf]/[cidade]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
uf | String | Sim | Sigla do estado (ex. BA)
cidade | String | Sim | Nome da cidade

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

# Example

## TODO

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let kittens = api.kittens.get();
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Max",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/api/kittens`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.get(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve

## Delete a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.delete(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.delete(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -X DELETE
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.delete(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "deleted" : ":("
}
```

This endpoint deletes a specific kitten.

### HTTP Request

`DELETE http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to delete


```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
define('API_TRANSACTION_KEY', 'http://api.meutem.dev/');
$url = 'health-unit/1';

$param = array( 'Accept'          => 'application/json'
              , 'Transaction-key' => API_TRANSACTION_KEY);

$result = Requests::get(API_ENDPOINT . $url, $param, $data);
```