# NeoConvert

<img width="1536" height="1024" alt="image exemplo" src="https://github.com/user-attachments/assets/106ba0c6-7add-47f0-aaa4-b359a144d30b" />


## 1. Introdução

O presente documento tem como objetivo descrever de forma técnica o
funcionamento, a arquitetura e as tecnologias utilizadas no
desenvolvimento do sistema NeoConvert, um conversor de moedas online
criado com HTML, CSS e Python utilizando o framework Flask.\
O sistema foi projetado para fornecer conversões de moedas em tempo
real, com interface responsiva e mecanismo de contingência para garantir
operação mesmo diante de falhas da API externa.

## 2. Objetivos

### 2.1 Objetivo Geral

Desenvolver uma aplicação web simples, prática e eficiente para
conversão de moedas.

### 2.2 Objetivos Específicos

-   Permitir a inserção de valores para conversão.\
-   Selecionar moedas de origem e destino.\
-   Processar a conversão com base em uma API externa.\
-   Exibir o resultado ao usuário de forma clara.\
-   Implementar fallback para falhas externas.

## 3. Fundamentação Teórica

A conversão de moedas exige atualização constante de taxas. O projeto
utiliza a API ExchangeRate.host e o Flask como base do backend. A
renderização é feita com Jinja2, enquanto HTML5 e CSS3 estruturam a
interface.

## 4. Metodologia

1.  Estruturação da arquitetura.\
2.  Desenvolvimento do backend em Python.\
3.  Integração com a API.\
4.  Criação de fallback.\
5.  Implementação do frontend.\
6.  Testes locais.

## 5. Arquitetura do Sistema

Modelo MVC simplificado.

### 5.1 Estrutura de Diretórios

    NeoConvert/
    │── app.py
    │── README.md
    │── requirements.txt
    │── templates/
    │   ├── index.html
    │   └── result.html
    │── static/
        └── style.css

## 6. Tecnologias Utilizadas

-   Python 3\
-   Flask\
-   Requests\
-   HTML5\
-   CSS3\
-   Jinja2\
-   ExchangeRate.host API

## 7. Funcionamento da Conversão

### 7.1 Com API

Requisição ao endpoint:

    https://api.exchangerate.host/convert

API retorna a taxa → sistema calcula → exibe resultado.

### 7.2 Fallback

    fallback_rates = {
        "USD": {"BRL": 5.00, "EUR": 0.90},
        "BRL": {"USD": 0.20, "EUR": 0.18},
        "EUR": {"USD": 1.10, "BRL": 5.50}
    }

## 8. Backend

O arquivo app.py inicializa o Flask, define rotas, trata formulário,
integra com API, aplica fallback e renderiza templates.

## 9. Frontend

### 9.1 Templates

-   index.html\
-   result.html

### 9.2 CSS

Responsivo, moderno e organizado.

## 10. Requisitos

Python 3.8+, pip, navegador.

Instalação:

    pip install -r requirements.txt
    python app.py

## 11. Testes

-   API\
-   Fallback\
-   Responsividade\
-   Entradas inválidas\
-   Rotas e templates

## 12. Considerações Finais

O NeoConvert é leve, funcional e expansível. Possíveis melhorias incluem
banco de dados, dashboards, modos de exibição e login.

## 13. Referências

-   Flask Docs\
-   ExchangeRate.host\
-   PEP 8\
-   Jinja2 Docs
