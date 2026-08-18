"use strict";

window.MATERIALS = window.MATERIALS || {};
Object.assign(window.MATERIALS, {
  c1: {
    unitId: "c1",
    title: "パスワードと多要素認証・FIDO",
    sections: [
      {
        heading: "認証の3要素",
        body: "<p>本人確認（認証）の方法は3つの要素に分類されます。<b>知識情報</b>（パスワード・PINなど本人だけが知っていること）、<b>所持情報</b>（スマートフォン・ICカードなど本人だけが持っているもの）、<b>生体情報</b>（指紋・顔など本人の身体的特徴）です。このうち異なる2つ以上の要素を組み合わせる認証を<b>多要素認証（MFA: Multi-Factor Authentication）</b>と呼びます。</p><p>注意点として、「パスワード」と「秘密の質問」はどちらも知識情報なので、両方使っても多要素認証にはなりません（<b>2段階認証</b>ではあっても多要素ではない場合がある）。要素の種類が異なることが重要です。</p>"
      },
      {
        heading: "ワンタイムパスワード（OTP）",
        body: "<p><b>ワンタイムパスワード（OTP）</b>は、一定時間ごとに変化する使い捨ての数字列です。スマートフォンの認証アプリが生成する<b>TOTP（Time-based OTP）</b>方式が代表的で、サーバーとアプリが同じ秘密鍵と現在時刻から同じ数字を計算する仕組みです。SMSでコードを送る方式もありますが、SIMスワップ（他人が電話番号を乗っ取る手口）で盗まれるリスクがあるため、認証アプリの方が安全とされます。</p>"
      },
      {
        heading: "FIDO認証とパスキー",
        body: "<p><b>FIDO（Fast IDentity Online）</b>は、パスワードを使わない（または補完する）認証の標準規格です。仕組みの核心は<b>公開鍵暗号</b>にあります。利用者の端末内で秘密鍵と公開鍵のペアを作り、秘密鍵は端末（生体認証やPINで保護）から外に出さず、公開鍵だけをサービス側に登録します。ログイン時はサービスが送った<b>チャレンジ（ランダムな値）</b>に秘密鍵で署名して返すことで本人確認をします。</p><p>この仕組みにより、<b>フィッシング耐性</b>が生まれます。パスワードはどのサイトでも入力できてしまいますが、FIDOの署名は登録時のサイトのドメインに紐づくため、偽サイトに誘導されても認証が成立しません。この使いやすい実装が<b>パスキー（Passkey）</b>で、スマートフォンなどに保存され複数端末で同期できます。</p>",
        svg: "<svg viewBox=\"0 0 640 260\" width=\"100%\" style=\"max-width:640px;height:auto\"><rect x=\"30\" y=\"90\" width=\"160\" height=\"80\" rx=\"6\" fill=\"none\" stroke=\"var(--grid)\"/><text x=\"110\" y=\"120\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">利用者の端末</text><text x=\"110\" y=\"140\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--emerald)\">秘密鍵（保管）</text><rect x=\"450\" y=\"90\" width=\"160\" height=\"80\" rx=\"6\" fill=\"none\" stroke=\"var(--grid)\"/><text x=\"530\" y=\"120\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">サービス</text><text x=\"530\" y=\"140\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--indigo)\">公開鍵（登録済）</text><line x1=\"450\" y1=\"110\" x2=\"200\" y2=\"110\" stroke=\"var(--grid)\"/><polygon points=\"200,110 212,105 212,115\" fill=\"var(--grid)\"/><text x=\"325\" y=\"100\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--muted)\">①チャレンジ送信</text><line x1=\"190\" y1=\"150\" x2=\"440\" y2=\"150\" stroke=\"var(--indigo)\"/><polygon points=\"440,150 428,145 428,155\" fill=\"var(--indigo)\"/><text x=\"325\" y=\"170\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--muted)\">②秘密鍵で署名して返送</text><text x=\"325\" y=\"210\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--emerald)\">サービスは公開鍵で署名を検証→本人確認</text></svg>"
      },
      {
        heading: "試験ではこう出る",
        body: "<p><b>科目A-2</b>では「多要素認証として正しい組み合わせはどれか」「ワンタイムパスワードの仕組み」「FIDOやパスキーがフィッシング耐性を持つ理由」を選択肢で問われます。「知識×知識」の組み合わせを多要素認証と誤認させるひっかけ問題が定番です。</p><p><b>科目B</b>では、パスワードリスト攻撃やフィッシング被害を受けた事例に対し「多要素認証を導入せよ」という対策記述や、「なぜFIDO認証はフィッシングに強いか、パスワードと比較して述べよ」という理由説明が問われます。秘密鍵が端末外に出ない点とドメインに紐づく署名の2点を書けると高得点です。</p>"
      }
    ],
    terms: [
      { term: "多要素認証（MFA）", desc: "知識・所持・生体のうち異なる2つ以上の要素を組み合わせる認証方式。" },
      { term: "ワンタイムパスワード（OTP）", desc: "一度きり・短時間しか使えない使い捨てのパスワード。TOTPは時刻ベースで生成する方式。" },
      { term: "FIDO", desc: "公開鍵暗号を用いてパスワードに依存しない認証を実現する標準規格。" },
      { term: "パスキー", desc: "FIDOの仕組みを利用しやすくした実装で、端末間で同期できる認証情報。" },
      { term: "フィッシング耐性", desc: "偽サイトに誘導されても認証情報が盗まれたり不正利用されたりしない性質。" },
      { term: "SIMスワップ", desc: "他人になりすまして携帯電話番号を乗っ取り、SMS認証を突破する手口。" }
    ]
  },
  c2: {
    unitId: "c2",
    title: "SSOと認証連携（SAML/OAuth/OIDC）",
    sections: [
      {
        heading: "SSO（シングルサインオン）とは",
        body: "<p><b>SSO（Single Sign-On）</b>は、1回のログインで複数のサービスを利用できる仕組みです。社員が多数のSaaS（クラウド上で提供されるソフトウェア）を使う企業では、サービスごとにパスワードを覚えるのは非現実的かつ危険（使い回しの温床）なため、社内の<b>ID管理サービス（IdP）</b>で一度認証すれば、各SaaS（<b>SP: サービスプロバイダ</b>）にログイン済みとして扱われる仕組みが広く使われます。この認証情報のやり取りを標準化したのが<b>SAML・OAuth・OIDC</b>です。試験では3つの違いを混同しないことが重要です。</p>"
      },
      {
        heading: "SAML：認証情報を渡す仕組み",
        body: "<p><b>SAML（Security Assertion Markup Language）</b>は「この人はログイン済みである」という<b>認証結果（アサーション）</b>をIdPからSPへ安全に渡すための規格です。主に企業向けSaaSのSSOで使われます。流れは、利用者がSPにアクセス→SPがIdPへリダイレクト→IdPでログイン→IdPが署名付きのアサーションをSPへ渡す→SPがログイン状態にする、という順序です。アサーションに<b>デジタル署名</b>が付くことで、SPは改ざんされていないことを検証できます。</p>",
        svg: "<svg viewBox=\"0 0 640 280\" width=\"100%\" style=\"max-width:640px;height:auto\"><rect x=\"20\" y=\"110\" width=\"140\" height=\"60\" rx=\"6\" fill=\"none\" stroke=\"var(--grid)\"/><text x=\"90\" y=\"145\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">利用者</text><rect x=\"250\" y=\"20\" width=\"140\" height=\"60\" rx=\"6\" fill=\"none\" stroke=\"var(--indigo)\"/><text x=\"320\" y=\"55\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">IdP（認証）</text><rect x=\"480\" y=\"110\" width=\"140\" height=\"60\" rx=\"6\" fill=\"none\" stroke=\"var(--grid)\"/><text x=\"550\" y=\"145\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">SP（SaaS）</text><line x1=\"160\" y1=\"130\" x2=\"480\" y2=\"130\" stroke=\"var(--grid)\"/><polygon points=\"480,130 468,125 468,135\" fill=\"var(--grid)\"/><text x=\"320\" y=\"118\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--muted)\">①アクセス</text><line x1=\"160\" y1=\"150\" x2=\"270\" y2=\"80\" stroke=\"var(--grid)\"/><line x1=\"270\" y1=\"80\" x2=\"170\" y2=\"150\" stroke=\"var(--grid)\" stroke-dasharray=\"4\"/><text x=\"200\" y=\"100\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--muted)\">②IdPで認証</text><line x1=\"390\" y1=\"70\" x2=\"540\" y2=\"110\" stroke=\"var(--emerald)\"/><polygon points=\"540,110 528,108 532,118\" fill=\"var(--emerald)\"/><text x=\"470\" y=\"85\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--emerald)\">③署名付きアサーション</text><text x=\"320\" y=\"230\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--muted)\">SPは署名を検証し、ログイン状態にする</text></svg>"
      },
      {
        heading: "OAuth 2.0：権限を委譲する仕組み",
        body: "<p><b>OAuth 2.0</b>は「認証」ではなく<b>認可（許可）</b>のための規格です。「あるアプリに、自分の写真データへのアクセスだけを許可する」のように、パスワードそのものを渡さずに限定的な権限（<b>スコープ</b>）だけを与える仕組みです。認可サーバーが発行する<b>アクセストークン</b>を使ってAPIにアクセスします。「OAuthでログインする」という表現をよく見ますが、OAuth自体は本人確認の規格ではない点が試験でよく問われるひっかけです。</p>"
      },
      {
        heading: "OIDC：OAuthの上に認証を乗せる",
        body: "<p><b>OpenID Connect（OIDC）</b>は、OAuth 2.0の仕組みの上に「これは誰か」を伝える<b>IDトークン</b>を追加した規格です。「Googleでログイン」「Microsoftアカウントでログイン」といった一般的なSSOの多くはOIDCで実現されています。まとめると、<b>SAML＝企業向けSSOの認証情報連携（XML形式）</b>、<b>OAuth＝権限の委譲（認可）</b>、<b>OIDC＝OAuthを使った認証（IDトークン追加）</b>と整理すると混同しにくくなります。</p>"
      },
      {
        heading: "試験ではこう出る",
        body: "<p><b>科目A-2</b>の頻出パターンです。「OAuth 2.0の説明として正しいものはどれか」「SAMLで使われる技術要素はどれか（デジタル署名・XML等）」のように用語の定義や仕組みの正誤を問う4択が定番です。「OAuthは認証プロトコルである」という誤った選択肢に注意してください。</p><p><b>科目B</b>では、複数のSaaSを使う企業のSSO導入シナリオで「なぜSAMLアサーションに署名が必要か」「IdPが停止した場合の業務影響」「認可コードやトークンが漏えいした場合のリスクと対策（有効期限・スコープの最小化）」を記述させる問題が出ます。SaaS利用が前提の後期試験ではID管理・クラウド連携のシナリオと合わせて出やすい分野です。</p>"
      }
    ],
    terms: [
      { term: "SSO（シングルサインオン）", desc: "1回の認証で複数のサービスにログイン済みの状態にする仕組み。" },
      { term: "IdP（Identity Provider）", desc: "利用者の認証を行い、認証結果を他のサービスに伝える主体。" },
      { term: "SP（Service Provider）", desc: "IdPの認証結果を受け取ってログインを許可するサービス側。" },
      { term: "SAML", desc: "認証結果（アサーション）をXML形式でIdPからSPに伝える規格。署名により改ざんを検知する。" },
      { term: "OAuth 2.0", desc: "パスワードを渡さずに限定的な権限（スコープ）だけを他のアプリに許可する認可の規格。" },
      { term: "アクセストークン", desc: "OAuthで発行される、APIへのアクセスに使う一時的な権限証明。" },
      { term: "OpenID Connect（OIDC）", desc: "OAuth 2.0にIDトークンを追加し、認証（本人確認）を可能にした規格。" },
      { term: "IDトークン", desc: "OIDCで発行される、利用者が誰であるかの情報を含むトークン。" }
    ]
  },
  c3: {
    unitId: "c3",
    title: "アクセス制御と特権ID管理",
    sections: [
      {
        heading: "最小権限の原則",
        body: "<p><b>最小権限の原則（Principle of Least Privilege）</b>とは、利用者やプログラムには業務に必要な最小限の権限だけを与えるという考え方です。過剰な権限を与えると、アカウントが乗っ取られたときの被害範囲（ラテラルムーブメント＝侵入後の内部での権限拡大・横展開）が広がります。権限は定期的に棚卸しし、不要になったら速やかに削除することが重要です。</p>"
      },
      {
        heading: "アクセス制御の代表的な方式",
        body: "<p><b>RBAC（Role-Based Access Control）</b>は、利用者に直接ではなく「役割（ロール）」に権限を割り当て、利用者をロールに所属させる方式です。人事異動のたびに個別の権限を設定し直す手間を減らせます。これに対し、利用者や資源の<b>属性（部署・時間帯・端末の状態など）</b>で動的に判定する<b>ABAC（Attribute-Based Access Control）</b>もあり、より柔軟な制御が可能ですが設計は複雑になります。</p><p>また、DAC（任意アクセス制御。所有者が自由に権限を設定）とMAC（強制アクセス制御。システムが一元的にルールを強制）という古典的な分類もあり、科目Aで用語の定義を問われることがあります。</p>"
      },
      {
        heading: "特権ID管理",
        body: "<p>システム管理者権限やroot・Administratorのような<b>特権ID</b>は、あらゆる操作が可能なため乗っ取られた際の被害が甚大です。対策として、特権IDを個人に恒常的に割り当てず<b>PAM（Privileged Access Management）</b>製品で必要な時だけ払い出す、操作をすべて<b>証跡として記録・監視</b>する、特権IDのパスワードを定期的に自動でローテーションする、といった仕組みが使われます。共有アカウントの利用は「誰が操作したか」の特定（<b>アカウンタビリティ</b>）を困難にするため避けるべきとされます。</p>",
        svg: "<svg viewBox=\"0 0 640 240\" width=\"100%\" style=\"max-width:640px;height:auto\"><rect x=\"30\" y=\"90\" width=\"150\" height=\"60\" rx=\"6\" fill=\"none\" stroke=\"var(--grid)\"/><text x=\"105\" y=\"125\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">管理者</text><rect x=\"245\" y=\"90\" width=\"150\" height=\"60\" rx=\"6\" fill=\"none\" stroke=\"var(--indigo)\"/><text x=\"320\" y=\"115\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">PAM</text><text x=\"320\" y=\"135\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"12\" fill=\"var(--muted)\">申請・記録・払出</text><rect x=\"460\" y=\"90\" width=\"150\" height=\"60\" rx=\"6\" fill=\"none\" stroke=\"var(--grid)\"/><text x=\"535\" y=\"125\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"var(--ink)\">対象サーバー</text><line x1=\"180\" y1=\"120\" x2=\"245\" y2=\"120\" stroke=\"var(--grid)\"/><polygon points=\"245,120 233,115 233,125\" fill=\"var(--grid)\"/><text x=\"212\" y=\"105\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"12\" fill=\"var(--muted)\">申請</text><line x1=\"395\" y1=\"120\" x2=\"460\" y2=\"120\" stroke=\"var(--emerald)\"/><polygon points=\"460,120 448,115 448,125\" fill=\"var(--emerald)\"/><text x=\"428\" y=\"105\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"12\" fill=\"var(--muted)\">一時的に付与</text><text x=\"320\" y=\"190\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"13\" fill=\"var(--muted)\">操作ログはすべてPAMが記録・監視する</text></svg>"
      },
      {
        heading: "試験ではこう出る",
        body: "<p><b>科目A-2</b>では「RBACの説明として正しいものはどれか」「最小権限の原則の目的はどれか」のような用語理解問題や、DAC/MAC/RBACの分類を選ばせる問題が出ます。</p><p><b>科目B</b>では、退職者や異動者の権限が削除されずに残っていて不正アクセスにつながった事例や、共有の管理者アカウントが使われていて操作者を特定できなかった事例を題材に、「権限の棚卸しを定期的に行う」「特権IDをPAMで一元管理し個人に紐づける」といった具体的な改善策の記述が求められます。「なぜ共有アカウントが問題か」を問われたら、アカウンタビリティ（責任追跡性）の欠如を書けるようにしておきましょう。</p>"
      }
    ],
    terms: [
      { term: "最小権限の原則", desc: "業務に必要な最小限の権限だけを利用者やプログラムに与える考え方。" },
      { term: "RBAC", desc: "役割（ロール）に権限を割り当て、利用者をロールに所属させることで管理するアクセス制御方式。" },
      { term: "ABAC", desc: "利用者や資源の属性（部署・時間・端末状態など）に基づき動的にアクセスを判定する方式。" },
      { term: "特権ID", desc: "システム管理者権限など、通常の利用者より広範な操作が可能なアカウント。" },
      { term: "PAM（特権アクセス管理）", desc: "特権IDを必要な時だけ払い出し、操作を記録・監視する仕組みや製品。" },
      { term: "アカウンタビリティ（責任追跡性）", desc: "誰がいつどの操作を行ったかを後から特定できる性質。共有アカウントはこれを損なう。" }
    ]
  }
});
