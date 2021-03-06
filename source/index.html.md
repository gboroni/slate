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

`GET https://api.meutem.dev/get-cards-by-client/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID do cliente

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
$url = 'mark-card-as-sent';
$cabecalhos = ['Accept' => 'application/json'];
$dados = [
    'card_id'                => 1
];

return json_decode(Requests::post(API_ENDPOINT . $url, $cabecalhos, $dados));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "status": "201"
    "message": "Cartão atualizado com sucesso."
}
```

Utilize esse serviço para marcar um determinado cartão como enviado.

### Requisição HTTP

`POST https://api.meutem.dev/mark-card-as-sent`

### Parâmetros form-data

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
card_id | Number | Sim | O ID do cartão

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>












# Produtos

## Obter Detalhes

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'product/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "id": "1",
    "channels_id_fk": "13",
    "name": "ANUAL",
    "payment_method": "credito",
    "max_installment": "0",
    "cycle": "anual",
    "onix_code": "3066",
    "value": "100.00",
    "bonus": "0.00",
    "is_pre_print": "0",
    "description": "EXEMPLO",
    "details": "EXEMPLO",
    "is_active": "1",
    "is_sold_internet": "0",
    "name_on_internet": "",
    "min_quantity": "0",
    "max_quantity": "999999999",
    "card_src": null,
    "card_title": null,
    "has_drugstores": "1",
    "has_odonto": "1",
    "has_family": "1",
    "img_1": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo.png",
    "img_2": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo2.png",
    "img_3": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo3.png",
    "img_4": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo4.png",
    "variable_tax": null,
    "created_at": "2015-05-03 10:14:00",
    "updated_at": "2016-09-13 06:07:06",
    "deleted_at": null,
    "channel_name": "AVANTE",
    "channel_id": "13",
    "img_1_name": "exemplo.png",
    "img_2_name": "exemplo2.png",
    "img_3_name": "exemplo3.png",
    "img_4_name": "exemplo4.png"
}
```

Utilize esse serviço para buscar detalhes de uma determinado produto.

### Requisição HTTP

`GET https://api.meutem.dev/product/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID do produto a ser obtido

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Buscar Todos

Utilize esse serviço para buscar todos os produtos.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'get-all-products';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
    {
        "id": "1",
        "channels_id_fk": "13",
        "name": "ANUAL",
        "payment_method": "credito",
        "max_installment": "0",
        "cycle": "anual",
        "onix_code": "3066",
        "value": "100.00",
        "bonus": "0.00",
        "is_pre_print": "0",
        "description": "EXEMPLO",
        "details": "EXEMPLO",
        "is_active": "1",
        "is_sold_internet": "0",
        "name_on_internet": "",
        "min_quantity": "0",
        "max_quantity": "999999999",
        "card_src": null,
        "card_title": null,
        "has_drugstores": "1",
        "has_odonto": "1",
        "has_family": "1",
        "img_1": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo.png",
        "img_2": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo2.png",
        "img_3": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo3.png",
        "img_4": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo4.png",
        "variable_tax": null,
        "created_at": "2015-05-03 10:14:00",
        "updated_at": "2016-09-13 06:07:06",
        "deleted_at": null,
        "channel_name": "AVANTE",
        "channel_id": "13",
        "img_1_name": "exemplo.png",
        "img_2_name": "exemplo2.png",
        "img_3_name": "exemplo3.png",
        "img_4_name": "exemplo4.png"
    },
    {
        "id": "2",
        "channels_id_fk": "13",
        "name": "ANUAL",
        "payment_method": "credito",
        "max_installment": "0",
        "cycle": "anual",
        "onix_code": "3066",
        "value": "100.00",
        "bonus": "0.00",
        "is_pre_print": "0",
        "description": "EXEMPLO",
        "details": "EXEMPLO",
        "is_active": "1",
        "is_sold_internet": "0",
        "name_on_internet": "",
        "min_quantity": "0",
        "max_quantity": "999999999",
        "card_src": null,
        "card_title": null,
        "has_drugstores": "1",
        "has_odonto": "1",
        "has_family": "1",
        "img_1": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo.png",
        "img_2": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo2.png",
        "img_3": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo3.png",
        "img_4": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo4.png",
        "variable_tax": null,
        "created_at": "2015-05-03 10:14:00",
        "updated_at": "2016-09-13 06:07:06",
        "deleted_at": null,
        "channel_name": "AVANTE",
        "channel_id": "13",
        "img_1_name": "exemplo.png",
        "img_2_name": "exemplo2.png",
        "img_3_name": "exemplo3.png",
        "img_4_name": "exemplo4.png"
    }
]
```

`GET https://api.meutem.dev/get-all-products`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Buscar por Usuário

Utilize esse serviço para buscar todos os produtos de um determinado usuário.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'get-all-products-by-user/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
    {
        "id": "1",
        "channels_id_fk": "13",
        "name": "ANUAL",
        "payment_method": "credito",
        "max_installment": "0",
        "cycle": "anual",
        "onix_code": "3066",
        "value": "100.00",
        "bonus": "0.00",
        "is_pre_print": "0",
        "description": "EXEMPLO",
        "details": "EXEMPLO",
        "is_active": "1",
        "is_sold_internet": "0",
        "name_on_internet": "",
        "min_quantity": "0",
        "max_quantity": "999999999",
        "card_src": null,
        "card_title": null,
        "has_drugstores": "1",
        "has_odonto": "1",
        "has_family": "1",
        "img_1": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo.png",
        "img_2": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo2.png",
        "img_3": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo3.png",
        "img_4": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo4.png",
        "variable_tax": null,
        "created_at": "2015-05-03 10:14:00",
        "updated_at": "2016-09-13 06:07:06",
        "deleted_at": null,
        "channel_name": "AVANTE",
        "channel_id": "13",
        "img_1_name": "exemplo.png",
        "img_2_name": "exemplo2.png",
        "img_3_name": "exemplo3.png",
        "img_4_name": "exemplo4.png"
    },
    {
        "id": "2",
        "channels_id_fk": "13",
        "name": "ANUAL",
        "payment_method": "credito",
        "max_installment": "0",
        "cycle": "anual",
        "onix_code": "3066",
        "value": "100.00",
        "bonus": "0.00",
        "is_pre_print": "0",
        "description": "EXEMPLO",
        "details": "EXEMPLO",
        "is_active": "1",
        "is_sold_internet": "0",
        "name_on_internet": "",
        "min_quantity": "0",
        "max_quantity": "999999999",
        "card_src": null,
        "card_title": null,
        "has_drugstores": "1",
        "has_odonto": "1",
        "has_family": "1",
        "img_1": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo.png",
        "img_2": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo2.png",
        "img_3": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo3.png",
        "img_4": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo4.png",
        "variable_tax": null,
        "created_at": "2015-05-03 10:14:00",
        "updated_at": "2016-09-13 06:07:06",
        "deleted_at": null,
        "channel_name": "AVANTE",
        "channel_id": "13",
        "img_1_name": "exemplo.png",
        "img_2_name": "exemplo2.png",
        "img_3_name": "exemplo3.png",
        "img_4_name": "exemplo4.png"
    }
]
```

`GET https://api.meutem.dev/get-all-products-by-user/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | O ID do usuário

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>


## Busca por Canal

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'get-all-products-by-channel/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
    {
        "id": "1",
        "channels_id_fk": "13",
        "name": "ANUAL",
        "payment_method": "credito",
        "max_installment": "0",
        "cycle": "anual",
        "onix_code": "3066",
        "value": "100.00",
        "bonus": "0.00",
        "is_pre_print": "0",
        "description": "EXEMPLO",
        "details": "EXEMPLO",
        "is_active": "1",
        "is_sold_internet": "0",
        "name_on_internet": "",
        "min_quantity": "0",
        "max_quantity": "999999999",
        "card_src": null,
        "card_title": null,
        "has_drugstores": "1",
        "has_odonto": "1",
        "has_family": "1",
        "img_1": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo.png",
        "img_2": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo2.png",
        "img_3": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo3.png",
        "img_4": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo4.png",
        "variable_tax": null,
        "created_at": "2015-05-03 10:14:00",
        "updated_at": "2016-09-13 06:07:06",
        "deleted_at": null,
        "channel_name": "AVANTE",
        "channel_id": "13",
        "img_1_name": "exemplo.png",
        "img_2_name": "exemplo2.png",
        "img_3_name": "exemplo3.png",
        "img_4_name": "exemplo4.png"
    },
    {
        "id": "2",
        "channels_id_fk": "13",
        "name": "ANUAL",
        "payment_method": "credito",
        "max_installment": "0",
        "cycle": "anual",
        "onix_code": "3066",
        "value": "100.00",
        "bonus": "0.00",
        "is_pre_print": "0",
        "description": "EXEMPLO",
        "details": "EXEMPLO",
        "is_active": "1",
        "is_sold_internet": "0",
        "name_on_internet": "",
        "min_quantity": "0",
        "max_quantity": "999999999",
        "card_src": null,
        "card_title": null,
        "has_drugstores": "1",
        "has_odonto": "1",
        "has_family": "1",
        "img_1": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo.png",
        "img_2": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo2.png",
        "img_3": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo3.png",
        "img_4": "https://s3-sa-east-1.amazonaws.com/dev.media.meutem/products/exemplo4.png",
        "variable_tax": null,
        "created_at": "2015-05-03 10:14:00",
        "updated_at": "2016-09-13 06:07:06",
        "deleted_at": null,
        "channel_name": "AVANTE",
        "channel_id": "13",
        "img_1_name": "exemplo.png",
        "img_2_name": "exemplo2.png",
        "img_3_name": "exemplo3.png",
        "img_4_name": "exemplo4.png"
    }
]
```

Utilize esse serviço para buscar todos os produtos de um determinado canal.

### Requisição HTTP

`GET https://api.meutem.dev/get-all-products-by-channel/[id]`

### Parâmetros de URL

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | String | Sim | O id do canal

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Cadastrar

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'product';
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
        "product_id": 1,
        "product_name": "Exemplo"
    },
    "status": "200"
}
```

Utilize esse serviço para cadastrar um produto.

### Requisição HTTP

`POST https://api.meutem.dev/product`

### Parâmetros form-data

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
name | String | Sim | Nome do produto
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
$url = 'product/1';
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
        "product_id": 1,
        "product_name": "Exemplo"
    },
    "status": "200"
}
```

Utilize esse serviço para atualizar dados de um determinado produto.

### Requisição HTTP

`POST https://api.meutem.dev/product/[id]`

### Parâmetros form-data

Parâmetro | Tipo | Obrigatório | Descrição
--------- | ---- | ----------- | ---------
id | Number | Sim | ID do produto
name | String | Não | Nome do produto
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

## Ativar

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'activate-product/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "status": "201"
}
```

Utilize esse serviço para marcar um determinado produto como ativo.

### Requisição HTTP

`GET https://api.meutem.dev/activate-product/[id]`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

## Excluir

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'delete-product/1';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
[
    "ok"
]
```

Utilize esse serviço apagar um determinado produto da base de dados.

### Requisição HTTP

`GET https://api.meutem.dev/delete-product/[id]`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>

# Bancos

## Buscar Todos

Utilize esse serviço para buscar todos os bancos.

### Requisição HTTP

```php
<?php
require_once 'libraries/rmccue/requests/library/Requests.php';

define('API_ENDPOINT', 'http://api.meutem.dev/');
$url = 'banks';

return json_decode(Requests::get(API_ENDPOINT . $url));
```
> O comando acima retorna um JSON estruturado conforme exemplo:

```json
{
    "2": "654 - Banco A.J.Renner S.A.",
    "3": "246 - Banco ABC Brasil S.A.",
    "4": "75 - Banco ABN AMRO S.A.",
    "6": "25 - Banco Alfa S.A.",
    "7": "641 - Banco Alvorada S.A.",
    "8": "65 - Banco AndBank (Brasil) S.A.",
    "9": "213 - Banco Arbi S.A.",
    "10": "19 - Banco Azteca do Brasil S.A.",
    "12": "24 - Banco BANDEPE S.A.",
    "13": "29 - Banco Banerj S.A.",
    "15": "740 - Banco Barclays S.A.",
    "16": "107 - Banco BBM S.A.",
    "17": "31 - Banco Beg S.A.",
    "18": "122-8 - Banco BERJ S.A.",
    "19": "96 - Banco BM&FBOVESPA de Serviços de Liquidação e Custódia S.A",
    "20": "318 - Banco BMG S.A.",
    "21": "752 - Banco BNP Paribas Brasil S.A.",
    "22": "248 - Banco Boavista Interatlântico S.A.",
    "23": "218 - Banco Bonsucesso S.A.",
    "25": "36 - Banco Bradesco BBI S.A.",
    "26": "204 - Banco Bradesco Cartões S.A.",
    "27": "394 - Banco Bradesco Financiamentos S.A.",
    "28": "237 - Banco Bradesco S.A.",
    "29": "225 - Banco Brascan S.A.",
    "31": "208 - Banco BTG Pactual S.A.",
    "32": "44 - Banco BVA S.A.",
    "33": "263 - Banco Cacique S.A.",
    "34": "473 - Banco Caixa Geral - Brasil S.A.",
    "35": "412 - Banco Capital S.A.",
    "36": "40 - Banco Cargill S.A.",
    "38": "266 - Banco Cédula S.A.",
    "39": "739 - Banco Cetelem S.A.",
    "40": "233 - Banco Cifra S.A.",
    "41": "745 - Banco Citibank S.A.",
    "43": "241 - Banco Clássico S.A.",
    "45": "215 - Banco Comercial e de Investimento Sudameris S.A.",
    "47": "95 - Banco Confidence de Câmbio S.A.",
    "48": "756 - Banco Cooperativo do Brasil S.A. - BANCOOB",
    "49": "748 - Banco Cooperativo Sicredi S.A.",
    "50": "721 - Banco Credibel S.A.",
    "51": "222 - Banco Credit Agricole Brasil S.A.",
    "52": "505 - Banco Credit Suisse (Brasil) S.A.",
    "53": "229 - Banco Cruzeiro do Sul S.A.",
    "55": "3 - Banco da Amazônia S.A.",
    "56": "083-3 - Banco da China Brasil S.A.",
    "58": "707 - Banco Daycoval S.A.",
    "61": "300 - Banco de La Nacion Argentina",
    "62": "495 - Banco de La Provincia de Buenos Aires",
    "63": "494 - Banco de La Republica Oriental del Uruguay",
    "65": "456 - Banco de Tokyo-Mitsubishi UFJ Brasil S.A.",
    "66": "214 - Banco Dibens S.A.",
    "67": "1 - Banco do Brasil S.A.",
    "68": "47 - Banco do Estado de Sergipe S.A.",
    "69": "37 - Banco do Estado do Pará S.A.",
    "70": "39 - Banco do Estado do Piauí S.A. - BEP",
    "71": "41 - Banco do Estado do Rio Grande do Sul S.A.",
    "72": "4 - Banco do Nordeste do Brasil S.A.",
    "73": "265 - Banco Fator S.A.",
    "75": "224 - Banco Fibra S.A.",
    "76": "626 - Banco Ficsa S.A.",
    "82": "734 - Banco Gerdau S.A.",
    "84": "612 - Banco Guanabara S.A.",
    "86": "63 - Banco Ibi S.A. Banco Múltiplo",
    "88": "604 - Banco Industrial do Brasil S.A.",
    "89": "320 - Banco Industrial e Comercial S.A.",
    "90": "653 - Banco Indusval S.A.",
    "91": "630 - Banco Intercap S.A.",
    "92": "77 - Banco Intermedium S.A.",
    "93": "249 - Banco Investcred Unibanco S.A.",
    "95": "184 - Banco Itaú BBA S.A.",
    "96": "479 - Banco ItaúBank S.A",
    "100": "376 - Banco J. P. Morgan S.A.",
    "101": "74 - Banco J. Safra S.A.",
    "102": "217 - Banco John Deere S.A.",
    "103": "76 - Banco KDB S.A.",
    "104": "757 - Banco KEB do Brasil S.A.",
    "105": "600 - Banco Luso Brasileiro S.A.",
    "106": "243 - Banco Máxima S.A.",
    "109": "389 - Banco Mercantil do Brasil S.A.",
    "111": "370 - Banco Mizuho do Brasil S.A.",
    "112": "746 - Banco Modal S.A.",
    "114": "738 - Banco Morada S.A.",
    "116": "66 - Banco Morgan Stanley S.A.",
    "117": "45 - Banco Opportunity S.A.",
    "118": "79 - Banco Original do Agronegócio S.A.",
    "119": "212 - Banco Original S.A.",
    "121": "712-9 - Banco Ourinvest S.A.",
    "122": "623 - Banco PAN S.A.",
    "123": "611 - Banco Paulista S.A.",
    "124": "613 - Banco Pecúnia S.A.",
    "125": "094-2 - Banco Petra S.A.",
    "126": "643 - Banco Pine S.A.",
    "128": "724 - Banco Porto Seguro S.A.",
    "129": "735 - Banco Pottencial S.A.",
    "130": "638 - Banco Prosper S.A.",
    "132": "747 - Banco Rabobank International Brasil S.A.",
    "133": "088-4 - Banco Randon S.A.",
    "134": "356 - Banco Real S.A.",
    "135": "633 - Banco Rendimento S.A.",
    "136": "741 - Banco Ribeirão Preto S.A.",
    "139": "72 - Banco Rural Mais S.A.",
    "140": "453 - Banco Rural S.A.",
    "141": "422 - Banco Safra S.A.",
    "142": "33 - Banco Santander (Brasil) S.A.",
    "143": "743 - Banco Semear S.A.",
    "144": "749 - Banco Simples S.A.",
    "145": "366 - Banco Société Générale Brasil S.A.",
    "146": "637 - Banco Sofisa S.A.",
    "147": "12 - Banco Standard de Investimentos S.A.",
    "149": "464 - Banco Sumitomo Mitsui Brasileiro S.A.",
    "150": "082-5 - Banco Topázio S.A.",
    "152": "634 - Banco Triângulo S.A.",
    "153": "18 - Banco Tricury S.A.",
    "156": "655 - Banco Votorantim S.A.",
    "157": "610 - Banco VR S.A.",
    "158": "119 - Banco Western Union do Brasil S.A.",
    "161": "21 - BANESTES S.A. Banco do Estado do Espírito Santo",
    "163": "719 - Banif-Banco Internacional do Funchal (Brasil)S.A.",
    "164": "755 - Bank of America Merrill Lynch Banco Múltiplo S.A.",
    "165": "744 - BankBoston N.A.",
    "167": "73 - BB Banco Popular do Brasil S.A.",
    "168": "081-7 - BBN Banco Brasileiro de Negócios S.A.",
    "169": "250 - BCV - Banco de Crédito e Varejo S.A.",
    "170": "78 - BES Investimento do Brasil S.A.-Banco de Investimento",
    "173": "69 - BPN Brasil Banco Múltiplo S.A.",
    "175": "125 - Brasil Plural S.A. - Banco Múltiplo",
    "176": "70 - BRB - Banco de Brasília S.A.",
    "178": "092-2 - Brickell S.A. Crédito, financiamento e Investimento",
    "180": "104 - Caixa Econômica Federal",
    "181": "114-7 - Central das Coop. de Economia e Crédito Mutuo do Est. do ES",
    "182": "477 - Citibank S.A.",
    "184": "136 - CONFEDERACAO NACIONAL DAS COOPERATIVAS CENTRAIS UNICREDS",
    "185": "097-3 - Cooperativa Central de Crédito Noroeste Brasileiro Ltda.",
    "186": "085-x - Cooperativa Central de Crédito Urbano-CECRED",
    "187": "099-x - Cooperativa Central de Economia e Credito Mutuo das Unicreds",
    "188": "090-2 - Cooperativa Central de Economia e Crédito Mutuo das Unicreds",
    "189": "089-2 - Cooperativa de Crédito Rural da Região de Mogiana",
    "190": "087-6 - Cooperativa Unicred Central Santa Catarina",
    "191": "098-1 - CREDIALIANÇA COOPERATIVA DE CRÉDITO RURAL",
    "192": "487 - Deutsche Bank S.A. - Banco Alemão",
    "194": "64 - Goldman Sachs do Brasil Banco Múltiplo S.A.",
    "195": "62 - Hipercard Banco Múltiplo S.A.",
    "196": "399 - HSBC Bank Brasil S.A. - Banco Múltiplo",
    "197": "168 - HSBC Finance (Brasil) S.A. - Banco Múltiplo",
    "199": "492 - ING Bank N.V.",
    "200": "652 - Itaú Unibanco Holding S.A.",
    "201": "341 - Itaú Unibanco S.A.",
    "203": "488 - JPMorgan Chase Bank",
    "204": "14 - Natixis Brasil S.A. Banco Múltiplo",
    "205": "753 - NBC Bank Brasil S.A. - Banco Múltiplo",
    "206": "086-8 - OBOE Crédito Financiamento e Investimento S.A.",
    "208": "254 - Paraná Banco S.A.",
    "211": "751 - Scotiabank Brasil S.A. Banco Múltiplo",
    "216": "409 - UNIBANCO - União de Bancos Brasileiros S.A.",
    "217": "230 - Unicard Banco Múltiplo S.A.",
    "218": "091-4 - Unicred Central do Rio Grande do Sul"
}
```

`GET https://api.meutem.dev/banks`

<aside class="success">
A utilização desse serviço não requer autenticação
</aside>
