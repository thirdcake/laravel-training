---
title: 'ゲーテはすべてを言った'
date: '2026-05-10T14:11:54+09:00'
draft: false
weight: 500
params:
    subtitle: 'Relation の基礎'
---

## 問題

以下のような、ゲーテの名言 API を作成してください。

- エンドポイント `/quotes/goethe` に GET リクエストを送ると、ユーザー名 `goethe` の名言が、 json 形式でレスポンスされます
- users テーブルに、初期値としてユーザー名 `goethe` をseeding してください
- Quote （名言）モデル及び、 quotes テーブルを作成してください
- User と Quote は、1対多（one to many）の関係です。ユーザーは0以上複数の名言を発する可能性があります。すべての名言は、必ず1つのユーザーと結びつきます
- quotes テーブルの初期値として、 `Illuminate\Foundation\Inspiring::quotes()` メソッドの出力 Collection の名言部分を抽出したものを seeding してください
- 初期値の名言はすべて、ユーザー `goethe` の発言として結びつけてください

1. Red: 小さいテストを作成し、失敗を確認してください
1. Green: テストを成功させてください
1. Refactor: 整理・整頓してください
1. 必要に応じて、1から3を繰り返してください

## ヒント


<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。



</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel v13.7.0
- PHP 8.4
- PHPUnit

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

</details>

