---
title: '名言 CRUD システム'
date: '2026-05-12T17:19:43+09:00'
draft: false
weight: 5000
params:
    subtitle: '総合問題 1'
---

> [!Note]
> この問題は未完成です。

## 問題

以下のような CRUD システムを作ってください。

- ユーザー登録をすると、ユーザーになれる（サインアップ機能）
- ユーザーは、ログインすることで、500文字以内の「名言」を CRUD 操作できる
- ユーザーは、自分以外のユーザーの作成した「名言」を編集・削除できない
- ユーザーは、ログインしていない場合、「名言」を作成・編集・削除できない
- すべての「名言」は、必ずユーザー1人に帰属（belongs to）する
- 「名言」をひとつも持たないユーザーも許容する
- ログインしていなくても、以下の画面は閲覧可能とする
    - `/user-index` ： ユーザーの一覧を表示
    - `/user/<user_slug>` ： `<user_slug>` ユーザーの名言の一覧を表示
    - `/user/<user_slug>/<quote_id>` ： その名言を表示
- 初期データ（Seeding）として、初期ユーザー及び初期名言を用意する。Laravel に用意されている Inspiring クラスを利用して良い

{{< tdp-rgr>}}



## ヒント

<details>
<summary role="button" class="outline">背景知識</summary>

（未作成）


</details>

<details>
<summary role="button" class="outline">便利なアサーションの例</summary>

[アサーションの調べ方](/knowledge/assertions-list) も合わせてご覧ください。  
今回は、以下を使うのではないかと思います。

（未作成）

</details>

## 解答例

<details>
<summary role="button" class="secondary">続きを読む</summary>

実行環境：
- Laravel vxx.xx.xx
- PHP x.x
- PHPUnit

（未作成）

</details>

## 解説

<details>
<summary role="button" class="secondary">続きを読む</summary>

（未作成）

</details>


