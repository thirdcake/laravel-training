---
title: '偉人は名言を言った'
date: '2026-05-15T17:55:28+09:00'
draft: false
weight: 550
params:
    subtitle: 'Model の基礎'
---

## 問題

以下のような、名言 API を作成してください。

- `/quotes/{user_id}` に GET リクエストを送ると、ユーザーID が `user_id` に等しい偉人の名言が一覧で JSON 形式でレスポンスされる
- users テーブルに、初期値として偉人名を seeding しておく
- Quote （名言）モデル及び、 quotes テーブルを作成する
- User と Quote は、1対多（one to many）の関係。ユーザーは0以上複数の名言を発する可能性がある。すべての名言は、必ず1つのユーザーと結びつく
- quotes テーブルの初期値として、複数の名言を初期値として seeding しておく
- 初期値の名言はそれぞれ、各偉人ユーザーの発言として結びつける

{{< tdp-rgr >}}

## ヒント

<details>
<summary role="button" class="outline">背景知識</summary>

- JSON を出力する方法： [或るリクエストの一生](/knowledge/a-request-lifecycle/) のレスポンスオブジェクトの部分
- 名言を取得する方法： [Inspiring PHP クラス](/knowledge/inspiring-php-class/)

</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

- {{< assertion "assertSame" >}}
- {{< assertion "assertJsonCount" >}}
- {{< assertion "assertSeeText" >}}

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.9.0
- PHP 8.4
- PHPUnit

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

</details>

