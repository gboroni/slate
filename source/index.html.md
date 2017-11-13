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

A utilização de alguns serviços está condicionada a informar no cabeçalho HTTP uma chave válida alfanumérica de 50 caracteres válida por meio do parâmetro Transaction-key.

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

`GET https://api.meutem.dev/health-units/search-units-filter/[limit]/[offset]?specialties=[specialties]&state=[state]&city=[city]&neighborhood=[neighborhood]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
limit | Number | Sim | Limite para a pesquisa (max: 50)
offset | String | Sim | Offset para a pesquisa

### Parâmetros de Consulta

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
specialties | Number | Não | Id da especialidade desejada
state | String | Não | Sigla do estado (ex. BA)
city | String | Não | Nome da cidade
neighborhood | String | Não | Nome do bairro

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

`GET https://api.meutem.dev/health-units-cities/[state]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
state | String | Sim | Sigla do estado (ex. BA)

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

`GET https://api.meutem.dev/health-units-neighborhoods/[state]/[city]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
state | String | Sim | Sigla do estado (ex. BA)
city | String | Sim | Nome da cidade

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

# Farmácias

## Obter Detalhes

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
define('API_TRANSACTION_KEY', 'njRRmvsxpZ******************************s7rbscHNmL');
$cabecalhos = ['Transaction-key' => API_TRANSACTION_KEY];
$url = 'drugstore/1';

return json_decode(Requests::get(API_ENDPOINT . $url, $cabecalhos));
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
define('API_TRANSACTION_KEY', 'njRRmvsxpZ******************************s7rbscHNmL');
$cabecalhos = ['Transaction-key' => API_TRANSACTION_KEY];
$parametros = [
                'state'        => 'se',
                'city'         => 'aracaju',
                'neighborhood' => 'centro'
              ];
$url = 'drugstores/search-units-filter/20/0?' . http_build_query($parametros);

return json_decode(Requests::get(API_ENDPOINT . $url, $cabecalhos));
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

`GET https://api.meutem.dev/drugstores/search-units-filter/[limit]/[offset]?state=[state]&city=[city]&neighborhood=[neighborhood]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
limit | Number | Sim | Limite para a pesquisa (max: 50)
offset | String | Sim | Offset para a pesquisa

### Parâmetros de Consulta

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
state | String | Não | Sigla do estado (ex. BA)
city | String | Não | Nome da cidade
neighborhood | String | Não | Nome do bairro

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

## Busca por Palavra-chave

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
define('API_TRANSACTION_KEY', 'njRRmvsxpZ******************************s7rbscHNmL');
$cabecalhos = ['Transaction-key' => API_TRANSACTION_KEY];
$url = 'drugstores/search-units/20/0?parameters=aracaju';

return json_decode(Requests::get(API_ENDPOINT . $url, $cabecalhos));
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
parameters | String | Sim | Palavra-chave que filtra nome, bairro, cidade, uf ou zona

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
define('API_TRANSACTION_KEY', 'njRRmvsxpZ******************************s7rbscHNmL');
$cabecalhos = ['Transaction-key' => API_TRANSACTION_KEY];
$url = 'drugstores-states';

return json_decode(Requests::get(API_ENDPOINT . $url, $cabecalhos));
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
define('API_TRANSACTION_KEY', 'njRRmvsxpZ******************************s7rbscHNmL');
$cabecalhos = ['Transaction-key' => API_TRANSACTION_KEY];
$url = 'drugstores-cities/se';

return json_decode(Requests::get(API_ENDPOINT . $url, $cabecalhos));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
  {
    "city": "ARACAJU"
  }
]
```

`GET https://api.meutem.dev/drugstores-cities/[state]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
state | String | Sim | Sigla do estado (ex. BA)

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
define('API_TRANSACTION_KEY', 'njRRmvsxpZ******************************s7rbscHNmL');
$cabecalhos = ['Transaction-key' => API_TRANSACTION_KEY];
$url = 'drugstores-neighborhoods/se/aracaju';

return json_decode(Requests::get(API_ENDPOINT . $url, $cabecalhos));
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

`GET https://api.meutem.dev/drugstores-neighborhoods/[state]/[city]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
state | String | Sim | Sigla do estado (ex. BA)
city | String | Sim | Nome da cidade

<aside class="warning">
A utilização desse serviço requer <a href="#autenticacao">autenticação <i class="fa fa-external-link"></i></a>
</aside>

# Clientes

## Obter Detalhes

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'client/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "id": "1",
    "cpf": "123.45.789-09",
    "name": "Exemplo",
    "email": "exemplote@exemplo.com.br",
    "rg": "123456789",
    "other_document": null,
    "birthdate": "01/01/1900",
    "telephone_1": "(99) 99999-9999",
    "telephone_2": "(99) 9999-9999",
    "gender": "feminino",
    "password": "27e6MhtVo1OoqT4z6De/AjONQ6nSAzDxVtJrVWGl2akPGbUfpnAte8vVfgV809LGvqCU73NA74TKQljg0Sv/nQ==",
    "addresses_id_fk": "55",
    "has_access": "0",
    "forgot_token": null,
    "imported": null,
    "created_at": "2015-05-04 14:54:46",
    "deleted_at": null,
    "updated_at": null,
    "address": {
        "id": "1",
        "postal_code": "99999-999",
        "address": "Rua Exemplo",
        "number": "123",
        "complement": "apto 123",
        "neighborhood": "Centro",
        "city": "Aracaju",
        "state": "SE",
        "latitude": null,
        "longitude": null,
        "created_at": "2015-05-04 14:54:46",
        "updated_at": null,
        "deleted_at": null
    }
}
```

Utilize esse serviço para buscar detalhes de uma determinado cliente.

### Requisição HTTP

`GET https://api.meutem.dev/client/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID do cliente a ser obtido

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Buscar Todos

Utilize esse serviço para buscar todos os clientes.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'get-all-clients';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
    {
        "id": "1",
        "cpf": "123.456.789-09",
        "name": "Exemplo",
        "email": "exemplo@exemplo.com.br",
        "rg": "123456",
        "other_document": null,
        "birthdate": "1900-01-01",
        "telephone_1": "(99) 99999-9999",
        "telephone_2": "(99) 9999-9999",
        "gender": "feminino",
        "password": "27e6MhtVo1OoqT4z6De/AjONQ6nSAzDxVtJrVWGl2akPGbUfpnAte8vVfgV809LGvqCU73NA74TKQljg0Sv/nQ==",
        "addresses_id_fk": "55",
        "has_access": "0",
        "forgot_token": null,
        "imported": null,
        "created_at": "2015-05-04 14:54:46",
        "deleted_at": null,
        "updated_at": null,
        "card": {
            "id": "1",
            "client_name": "EXEMPLO",
            "product_name": "ANUAL",
            "card_number": "9999999999999999",
            "card_validator": null,
            "channel_name": "AVANTE",
            "created_at": "2015-05-04 02:54:46",
            "updated_at": "2015-05-04 03:20:30",
            "is_pre_print": "0",
            "status": "CAPTURED",
            "permalink": "",
            "channels_id_fk": null,
            "cards_number_channel_name": null
        },
        "channel": null
    },
    {
        "id": "2",
        "cpf": "987.654.321-09",
        "name": "Exemplo2",
        "email": "exemplo2@exemplo.com.br",
        "rg": "456789",
        "other_document": null,
        "birthdate": "1900-01-01",
        "telephone_1": "(99) 99999-9999",
        "telephone_2": "(99) 9999-9999",
        "gender": "masculino",
        "password": "27e6MhtVo1OoqT4z6De/AjONQ6nSAzDxVtJrVWGl2akPGbUfpnAte8vVfgV809LGvqCU73NA74TKQljg0Sv/nQ==",
        "addresses_id_fk": "55",
        "has_access": "0",
        "forgot_token": null,
        "imported": null,
        "created_at": "2015-05-04 14:54:46",
        "deleted_at": null,
        "updated_at": null,
        "card": {
            "id": "1",
            "client_name": "EXEMPLO2",
            "product_name": "ANUAL",
            "card_number": "8888888888888888",
            "card_validator": null,
            "channel_name": "AVANTE",
            "created_at": "2015-05-04 02:54:46",
            "updated_at": "2015-05-04 03:20:30",
            "is_pre_print": "0",
            "status": "CAPTURED",
            "permalink": "",
            "channels_id_fk": null,
            "cards_number_channel_name": null
        },
        "channel": null
    }
]
```

`GET https://api.meutem.dev/get-all-clients`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca por CPF

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'get-client-by-cpf/123.456.789-09';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "id": "1",
    "cpf": "123.456.789-09",
    "name": "Exemplo",
    "email": "exemplo@exemplo.com.br",
    "rg": "123456",
    "other_document": null,
    "birthdate": "1900-01-01",
    "telephone_1": "(99) 99999-9999",
    "telephone_2": "(99) 9999-9999",
    "gender": "feminino",
    "password": "27e6MhtVo1OoqT4z6De/AjONQ6nSAzDxVtJrVWGl2akPGbUfpnAte8vVfgV809LGvqCU73NA74TKQljg0Sv/nQ==",
    "addresses_id_fk": "55",
    "has_access": "0",
    "forgot_token": null,
    "imported": null,
    "created_at": "2015-05-04 14:54:46",
    "deleted_at": null,
    "updated_at": null,
    "card": {
        "id": "1",
        "client_name": "EXEMPLO",
        "product_name": "ANUAL",
        "card_number": "9999999999999999",
        "card_validator": null,
        "channel_name": "AVANTE",
        "created_at": "2015-05-04 02:54:46",
        "updated_at": "2015-05-04 03:20:30",
        "is_pre_print": "0",
        "status": "CAPTURED",
        "permalink": "",
        "channels_id_fk": null,
        "cards_number_channel_name": null
    }
}
```

Utilize esse serviço para buscar um cliente pelo cpf.

### Requisição HTTP

`GET https://api.meutem.dev/get-client-by-cpf/[cpf]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
cpf | String | Sim | O cpf do cliente (formato 999.999.999-99)

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Cadastrar

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'client';
$cabecalhos = ['Accept' => 'application/json'];
$dados = [
    'name' => 'Exemplo';
    'cpf' => '123.456.789-09';
    'rg' => '123456';
    'gender' => 'masculino';
    'birthdate' => '1900-01-01';
    'channel_id' => 1;
    'other_document' => null;
    'password' => '123456';
    'email' => 'exemplo@exemplo.com';
    'telephone_1' => '(99) 99999-9999)';
    'telephone_2' => null;
    'address' => 'Rua Exemplo';
    'complement' => null;
    'number' => 123;
    'state' => 'se';
    'city' => 'aracaju';
    'neighborhood' => 'centro';
    'postalCode' => '49000-000"';
];

return json_decode(Requests::post(API_ENDPOINT . $url, $cabecalhos, $dados));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "result": {
        "client_id": 1,
        "client_name": "Exemplo"
    },
    "status": "200"
}
```

Utilize esse serviço para cadastrar um cliente.

### Requisição HTTP

`POST https://api.meutem.dev/client`

### Parâmetros form-data

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
name | String | Sim | Nome do cliente
address | String | Sim | Logradouro
number | String | Sim | Número do endereço
state | String | Sim | Sigla do estado (ex. BA)
city | String | Sim | Nome da cidade
neighborhood | String | Sim | Nome do bairro
postalCode | String | Sim | CEP
email | String | Sim | Endereço de e-mail
telephone_1 | String | Sim | Telefone 1 (formato (99) 99999-9999 ou (99) 9999-9999)
telephone_2 | String | Não | Telefone 2  (formato (99) 99999-9999 ou (99) 9999-9999)
cpf | String | Não | CPF (formato 999.999.999-99)
rg | String | Não | RG
gender | String | Não | Sexo (informar 'masculino' ou 'feminino')
birthdate | String | Não | Data de nascimento (formato 9999-99-99)
channel_id | Number | Não | ID do canal
other_document | String | Não | TODO: Documentar
password | String | Não | Senha de acesso ao sistema (caso não informada, 12345678 é a padrão)
complement | String | Não | Complemento do endereço

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Atualizar

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'client/1';
$cabecalhos = ['Accept' => 'application/json'];
$dados = [
    'name' => 'Exemplo';
    'cpf' => '123.456.789-09';
    'rg' => '123456';
    'gender' => 'masculino';
    'birthdate' => '1900-01-01';
    'channel_id' => 1;
    'other_document' => null;
    'password' => '123456';
    'email' => 'exemplo@exemplo.com';
    'telephone_1' => '(99) 99999-9999)';
    'telephone_2' => null;
    'address' => 'Rua Exemplo';
    'complement' => null;
    'number' => 123;
    'state' => 'se';
    'city' => 'aracaju';
    'neighborhood' => 'centro';
    'postalCode' => '49000-000"';
];

return json_decode(Requests::post(API_ENDPOINT . $url, $cabecalhos, $dados));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "result": {
        "client_id": 1,
        "client_name": "Exemplo"
    },
    "status": "200"
}
```

Utilize esse serviço para atualizar dados de um determinado cliente.

### Requisição HTTP

`POST https://api.meutem.dev/client/[id]`

### Parâmetros form-data

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | ID do cliente
name | String | Não | Nome do cliente
address | String | Não | Logradouro
number | String | Não | Número do endereço
state | String | Não | Sigla do estado (ex. BA)
city | String | Não | Nome da cidade
neighborhood | String | Não | Nome do bairro
postalCode | String | Não | CEP
email | String | Não | Endereço de e-mail
telephone_1 | String | Não | Telefone 1 (formato (99) 99999-9999 ou (99) 9999-9999)
telephone_2 | String | Não | Telefone 2  (formato (99) 99999-9999 ou (99) 9999-9999)
cpf | String | Não | CPF (formato 999.999.999-99)
rg | String | Não | RG
gender | String | Não | Sexo (informar 'masculino' ou 'feminino')
birthdate | String | Não | Data de nascimento (formato 9999-99-99)
channel_id | Number | Não | ID do canal
other_document | String | Não | TODO: Documentar
password | String | Não | Senha de acesso ao sistema (caso não informada, 12345678 é a padrão)
complement | String | Não | Complemento do endereço

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Excluir

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'delete-client/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "status": "200"
}
```

Utilize esse serviço apagar um determinado cliente da base de dados.

### Requisição HTTP

`GET https://api.meutem.dev/delete-client/[id]`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

# Empresas

## Buscar Todos

Utilize esse serviço para buscar todos os clientes.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'companies/getAll';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
    {
        "id": "1",
        "sindicates_id_fk": "1",
        "cnpj": "99.999.999/9999-99",
        "name": "Exemplo",
        "password": "Izq4VEopEdnthWuL6qrznrsmz6kn/CzSHZfQvm1TdtGG1dcuCmZOA0qCVGKin+XVTurxEUuootSKEqQj7pT28A==",
        "addresses_id_fk": "1",
        "contact_name": "Exemplo",
        "contact_telephone": "(99) 9999-9999",
        "contact_cellphone": "(99) 99999-9999",
        "contact_email": "exemplo@exemplo.com",
        "employees": "2",
        "cards": "2",
        "status": null,
        "observations": null,
        "created_at": "2016-07-14 12:37:41",
        "updated_at": null,
        "deleted_at": null
    },
    {
        "id": "2",
        "sindicates_id_fk": "1",
        "cnpj": "88.888.888/8888-88",
        "name": "Exemplo2",
        "password": "+5ji5RedlPG0wjzSAS5bOWexcdP8OH2KSbWqgK0izhZoq9tzMyCoFncqR9vG1UJShfYmMDPcUIN7ekov++PbMg==",
        "addresses_id_fk": "2",
        "contact_name": "CAMILA ALMEIDA",
        "contact_telephone": "(11) 5666-3181",
        "contact_cellphone": "(11) 96398-2677",
        "contact_email": "exemplo2@exemplo.com",
        "employees": "5",
        "cards": "5",
        "status": "em_implantacao",
        "observations": "Entrei em contato mas a Exemplo responsável pela negociação, está afastada, retornarei o contato",
        "created_at": "2016-07-26 15:19:29",
        "updated_at": "2016-08-30 10:38:56",
        "deleted_at": null
    }
]
```

`GET https://api.meutem.dev/companies/getAll`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

# Cartões

## Obter Detalhes

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'card/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "id": "1",
    "client_name": "Exemplo",
    "product_name": "ANUAL",
    "card_number": "9999999999999999",
    "card_validator": null,
    "channel_name": "AVANTE",
    "created_at": "2015-05-04 11:35:50",
    "updated_at": "2015-05-08 05:26:12",
    "is_pre_print": "0",
    "subscription_status": "CAPTURED",
    "sent_at": null
}
```

Utilize esse serviço para buscar detalhes de uma determinado cartão.

### Requisição HTTP

`GET https://api.meutem.dev/card/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID do cartão a ser obtido

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Buscar Todos

Utilize esse serviço para buscar todos os cartões.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$parametros = ['userId' => 1];
$url = 'get-all-cards?' . http_build_query($parametros);

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
    {
        "id": "1",
        "client_name": "Exemplo",
        "product_name": "ANUAL",
        "card_number": "9999999999999999",
        "card_validator": null,
        "channel_name": "AVANTE",
        "created_at": "2015-05-04 11:35:50",
        "updated_at": "2015-05-08 05:26:12",
        "is_pre_print": "0",
        "subscription_status": "CAPTURED",
        "sent_at": null
    },
    {
        "id": "2",
        "client_name": "Exemplo2",
        "product_name": "ANUAL",
        "card_number": null,
        "card_validator": null,
        "channel_name": "AVANTE",
        "created_at": "2015-05-04 11:35:50",
        "updated_at": "2015-05-08 05:26:12",
        "is_pre_print": "0",
        "subscription_status": "REFUSED",
        "sent_at": null
    }
]
```

`GET https://api.meutem.dev/get-all-cards?userId=[userId]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
userId | Number | Sim | O usuário que está solicitando. Se o usuário não for administrador, só poderá obter os cartões do canal a que pertence

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Busca por Cliente

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'get-cards-by-client/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "id": "1",
    "client_name": "Exemplo",
    "product_name": "ANUAL",
    "card_number": "9999999999999999",
    "card_validator": null,
    "channel_name": "AVANTE",
    "created_at": "2015-05-04 11:35:50",
    "updated_at": "2015-05-08 05:26:12",
    "is_pre_print": "0",
    "subscription_status": "CAPTURED",
    "sent_at": null
}
```

Utilize esse serviço para buscar o cartão de determinado cliente.

### Requisição HTTP

`GET https://api.meutem.dev/get-cards-by-client/[clientId]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
clientId | Number | Sim | O ID do cliente

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Atualizar

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'card';
$cabecalhos = ['Accept' => 'application/json'];
$dados = [
    'card_id'                => 1
    'card_number'            => '9999999999999999',
    'card_validator'         => '123',
    'updated_by_users_id_fk' => 1
];

return json_decode(Requests::post(API_ENDPOINT . $url, $cabecalhos, $dados));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "status": "201"
}
```

TODO: Documentar

### Requisição HTTP

`POST https://api.meutem.dev/card`

### Parâmetros form-data

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
card_id | Number | Sim | ID do cartão
card_number | Number | Sim | Número do cartão
card_validator | Number | Sim | Validador do cartão
updated_by_users_id_fk | Number | Não | ID do usuário que fez a atualização

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Marcar como enviado

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'mark-card-as-sent/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "status": "200"
}
```

Utilize esse serviço para marcar um determinado cartão como enviado.

### Requisição HTTP

`GET https://api.meutem.dev/mark-card-as-sent/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID do cartão

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>
