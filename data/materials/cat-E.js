window.MATERIALS = window.MATERIALS || {};
Object.assign(window.MATERIALS, {
  e1: {
    unitId: "e1",
    title: `クロスサイトスクリプティング(XSS)`,
    sections: [
      {
        heading: `XSSとは`,
        body: `<p>クロスサイトスクリプティング（XSS）は、Webサイトの入力処理の不備を悪用し、攻撃者が用意した<b>スクリプト</b>（ブラウザ上で動くプログラム、主にJavaScript）を他の利用者のブラウザで実行させる攻撃です。Webアプリが利用者の入力値をそのままHTMLとして画面に出力してしまう場合に成立します。実行されたスクリプトは、ログイン状態を保つ<b>Cookie</b>（ブラウザに保存される小さなデータ）を盗み出したり、偽の入力フォームを重ねて表示しパスワードを入力させたり、利用者の権限でページ内の操作を勝手に実行したりします。原因は入力値そのものではなく「出力する際にエスケープを怠ること」にある点を理解しておくことが重要です。入力を制限するだけでは、URLパラメータや他システム経由で渡ってきたデータまでは防げません。</p>`
      },
      {
        heading: `3つの分類：反射型・格納型・DOM型`,
        body: `<p>XSSは、悪意のあるスクリプトがどこを経由して実行されるかによって3つに分類されます。</p>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>反射型</td><td>URLのパラメータなど、その場限りの入力がそのまま応答に反映されて実行される</td></tr>
<tr><td>格納型</td><td>掲示板の投稿などスクリプトがサーバーに保存され、閲覧した全員に実行される（被害が広がりやすい）</td></tr>
<tr><td>DOM型</td><td>サーバーを経由せず、ブラウザ内のJavaScriptが入力値を安全に扱わないために発生する</td></tr>
</table>
<p>試験では、「サーバーに保存されるかどうか」「反映されるタイミング」を基準に区別できるようにしておくと選択肢を絞りやすくなります。</p>`
      },
      {
        heading: `攻撃の流れ（反射型の例）`,
        body: `<p>反射型XSSでは、次のような流れで被害が発生します。</p>`,
        svg: `<svg viewBox="0 0 640 300" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="46" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">① 攻撃者が悪意のあるスクリプトを含むURLを作成</text>
<line x1="320" y1="66" x2="320" y2="78" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,78 326,78 320,86" fill="var(--grid)"/>
<rect x="70" y="86" width="500" height="50" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="116" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">② 利用者がリンクをクリックしサーバーへリクエスト</text>
<line x1="320" y1="136" x2="320" y2="148" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,148 326,148 320,156" fill="var(--grid)"/>
<rect x="70" y="156" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="186" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③ サーバーが入力をそのままHTMLに含めて応答</text>
<line x1="320" y1="206" x2="320" y2="218" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,218 326,218 320,226" fill="var(--grid)"/>
<rect x="70" y="226" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="256" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">④ ブラウザでスクリプトが実行されCookie等が漏えい</text>
</svg>`
      },
      {
        heading: `対策：出力時エスケープとCSP`,
        body: `<p>根本対策は、利用者の入力を画面に出力する際に、出力先の文脈（HTML本文・属性値・JavaScript内など）に応じて特殊文字を無害化する<b>エスケープ処理</b>です。例えばHTML本文では &lt; を &amp;lt; に変換します。文脈を誤ると同じエスケープでも防げないため、多くのフレームワークはテンプレート機能で自動エスケープを行い、開発者が生のHTMLを組み立てないようにしています。</p>
<code>textContent = userInput; // innerHTMLではなくtextContentで安全に出力</code>
<p>加えて、<b>CSP（Content Security Policy）</b>というHTTPレスポンスヘッダーで、実行を許可するスクリプトの読み込み元を指定すれば、たとえエスケープ漏れがあっても外部からの不正なスクリプト実行を防げます。CookieにHttpOnly属性を付けると、JavaScriptからCookieを読み取れなくなり、盗用の被害を減らせます。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では「反射型・格納型・DOM型の違い」「対策として最も適切なもの（エスケープ処理／プレースホルダーとの区別）」を選ばせる問題が定番です。科目Bでは、Webサイトの入力フォームのコード断片が示され、「なぜXSSが成立するか」を入力値の出力箇所から指摘させたり、「CSPヘッダーにどの値を設定すべきか」を答えさせたりする出題が見られます。</p>`
      }
    ],
    terms: [
      { term: "XSS", desc: "クロスサイトスクリプティングの略。悪意あるスクリプトを他人のブラウザで実行させる攻撃。" },
      { term: "エスケープ処理", desc: "特殊文字を無害な文字列に変換し、意図しないコードとして解釈されないようにする処理。" },
      { term: "サニタイジング", desc: "入力値から危険な文字列や構造を取り除く、または無害化すること。" },
      { term: "CSP", desc: "Content Security Policyの略。実行を許可するスクリプトの読み込み元をブラウザに指示するHTTPヘッダー。" },
      { term: "HttpOnly属性", desc: "JavaScriptからのCookie読み取りを禁止し、XSSによる窃取を防ぐCookie属性。" },
      { term: "反射型XSS", desc: "URLパラメータなど一時的な入力がそのまま応答に反映されて実行されるXSS。" },
      { term: "格納型XSS", desc: "掲示板の投稿などサーバーに保存されたスクリプトが閲覧者全員に実行されるXSS。" },
      { term: "DOM型XSS", desc: "サーバーを経由せずブラウザ内のJavaScript処理だけで発生するXSS。" }
    ]
  },

  e2: {
    unitId: "e2",
    title: `SQLインジェクション`,
    sections: [
      {
        heading: `SQLインジェクションとは`,
        body: `<p>SQLインジェクションは、Webアプリがデータベースへの命令文（SQL文）を、利用者の入力値を文字列としてそのまま組み込んで作ってしまう場合に、入力に細工したSQLの断片を混入させ、想定外の命令を実行させる攻撃です。例えば、ログイン処理を <code>"SELECT * FROM users WHERE id='" + id + "'"</code> のように文字列連結で組み立てていると、id に <code>' OR '1'='1</code> を入力するだけでWHERE句の条件が常に真になり、パスワードを知らなくても最初の1件のユーザーとしてログインできてしまいます。</p>`
      },
      {
        heading: `なぜ危険か`,
        body: `<p>成功すると、ログインをパスワードなしで突破したり（認証回避）、他人の個人情報を含む全件データを取得したり、データを改ざん・削除されたりする恐れがあります。さらに、データベースの管理者権限が奪われると、サーバー内のファイルを読み書きする機能を悪用され、Webサーバー自体を乗っ取られる場合もあります。実際の情報漏えい事件でも最も多い原因の一つであり、被害件数・被害規模ともに大きい攻撃です。</p>`
      },
      {
        heading: `脆弱なコードと対策の比較`,
        body: `<p>ログインID欄に <code>' OR '1'='1</code> のような文字列を入力した場合を例に、脆弱な実装と安全な実装の違いを見てみます。同じ入力でも、SQL文の組み立て方によって結果がまったく異なることがわかります。</p>`,
        svg: `<svg viewBox="0 0 640 260" width="100%" style="max-width:640px;height:auto">
<text x="320" y="20" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">脆弱な実装（文字列連結）</text>
<rect x="10" y="36" width="150" height="56" rx="6" fill="none" stroke="var(--grid)"/>
<text x="85" y="68" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">入力: 'OR'1'='1</text>
<line x1="160" y1="64" x2="186" y2="64" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="186,58 186,70 195,64" fill="var(--grid)"/>
<rect x="195" y="36" width="210" height="56" rx="6" fill="none" stroke="var(--crit)"/>
<text x="300" y="68" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">文字列連結でSQL文を組立て</text>
<line x1="405" y1="64" x2="431" y2="64" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="431,58 431,70 440,64" fill="var(--grid)"/>
<rect x="440" y="36" width="190" height="56" rx="6" fill="none" stroke="var(--crit)"/>
<text x="535" y="68" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">WHERE句が壊れ全件取得</text>
<text x="320" y="160" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">安全な実装（プレースホルダー）</text>
<rect x="10" y="176" width="150" height="56" rx="6" fill="none" stroke="var(--grid)"/>
<text x="85" y="208" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">入力: 'OR'1'='1</text>
<line x1="160" y1="204" x2="186" y2="204" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="186,198 186,210 195,204" fill="var(--grid)"/>
<rect x="195" y="176" width="210" height="56" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="300" y="208" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">プレースホルダーに値を渡す</text>
<line x1="405" y1="204" x2="431" y2="204" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="431,198 431,210 440,204" fill="var(--grid)"/>
<rect x="440" y="176" width="190" height="56" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="535" y="208" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">値として比較され該当なし</text>
</svg>`
      },
      {
        heading: `対策：プレースホルダーと最小権限`,
        body: `<p>根本対策は、SQL文の構造（命令）と入力値（データ）を分離して組み立てる<b>プレースホルダー（バインド機構）</b>です。入力値がどんな文字列であってもデータとしてしか扱われず、SQL文の構造を変えられません。多くのORM（オブジェクト関係マッピング）フレームワークは標準でプレースホルダーを使うため、生のSQL文を自分で組み立てる場面を減らすこと自体も有効な対策です。</p>
<code>SELECT * FROM users WHERE id = ?  -- ?にはデータとして値がバインドされる</code>
<p>加えて、データベースに接続するアカウントには、そのアプリに必要な最小限の権限だけを与える<b>最小権限の原則</b>を適用しておくと、万一侵入された場合の被害も抑えられます。エラーメッセージにSQL文やテーブル名をそのまま表示しないことも、攻撃者に手がかりを与えない意味で重要です。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では「SQLインジェクションの根本的な対策として最も適切なもの＝プレースホルダー」を選ばせる問題が繰り返し出題されています（エスケープ処理だけでは不十分な点に注意）。科目Bでは、脆弱なSQL文の組み立てコードが提示され、どの入力がどこに影響するかを説明させたり、修正後のコードを穴埋めさせたりする出題があります。あわせて、被害を発見した後の対応（該当パスワードの一斉リセットなど）を問う設問が付随することもあります。</p>`
      }
    ],
    terms: [
      { term: "SQLインジェクション", desc: "入力値に細工したSQL文の断片を混入させ、データベースへ想定外の命令を実行させる攻撃。" },
      { term: "プレースホルダー", desc: "SQL文中でデータの入る位置を?などの記号で示し、後から安全に値を渡す仕組み。" },
      { term: "バインド機構", desc: "プレースホルダーに実際の値を割り当てる仕組み。値はデータとしてのみ扱われる。" },
      { term: "最小権限の原則", desc: "アカウントやプロセスに必要最小限の権限だけを与える考え方。" },
      { term: "ストアドプロシージャ", desc: "データベース側に事前定義した処理手順。使い方次第で対策にも脆弱性の原因にもなる。" },
      { term: "WAF", desc: "Webアプリケーションファイアウォール。既知の攻撃パターンを検知して通信を遮断する仕組み。" }
    ]
  },

  e3: {
    unitId: "e3",
    title: `CSRF・SSRF・クリックジャッキング`,
    sections: [
      {
        heading: `3つの攻撃の違い`,
        body: `<p>この3つは「利用者やサーバーに、本人／本来の意図とは異なるリクエストを送らせる」という点で似ていますが、狙う相手が異なります。名称が紛らわしいため、試験では「だれが」「何をだまされて」実行してしまうのかという観点で整理すると区別しやすくなります。</p>
<table>
<tr><th>攻撃</th><th>だます相手</th><th>概要</th></tr>
<tr><td>CSRF</td><td>ログイン中の利用者のブラウザ</td><td>罠サイトから正規サイトへ利用者に成りすましたリクエストを送らせる</td></tr>
<tr><td>SSRF</td><td>サーバー自身</td><td>サーバーに、本来アクセスできないはずの内部システムへリクエストさせる</td></tr>
<tr><td>クリックジャッキング</td><td>利用者の操作</td><td>透明なiframeなどで別サイトを重ね、意図しないボタンをクリックさせる</td></tr>
</table>`
      },
      {
        heading: `CSRFの流れ`,
        body: `<p>CSRF（クロスサイトリクエストフォージェリ）は次のような流れで成立します。</p>`,
        svg: `<svg viewBox="0 0 640 300" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="50" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="46" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">① 利用者が正規サイトにログイン中（Cookie保持）</text>
<line x1="320" y1="66" x2="320" y2="78" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,78 326,78 320,86" fill="var(--grid)"/>
<rect x="70" y="86" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="116" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">② 罠サイト（悪意のあるページ）を開いてしまう</text>
<line x1="320" y1="136" x2="320" y2="148" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,148 326,148 320,156" fill="var(--grid)"/>
<rect x="70" y="156" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="186" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③ 罠ページが正規サイトへ自動でリクエスト送信</text>
<line x1="320" y1="206" x2="320" y2="218" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,218 326,218 320,226" fill="var(--grid)"/>
<rect x="70" y="226" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="256" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">④ Cookieが自動送信され本人の操作として処理される</text>
</svg>`
      },
      {
        heading: `SSRFとは`,
        body: `<p>SSRF（サーバーサイドリクエストフォージェリ）は、外部URLを読み込む機能（画像取得やWebhookなど）を持つサーバーに対し、攻撃者が <code>http://169.254.169.254/</code> のようなクラウドの内部情報を返すアドレスや社内システムのURLを指定し、本来アクセスできないはずの内部リソースにアクセスさせる攻撃です。サーバーは信頼された立場でリクエストするため、外部からの直接アクセスより防御をすり抜けやすいのが特徴です。クラウド環境では、この方法でインスタンスの認証情報（アクセスキー等）を取得され、より大きな被害に発展した事例も報告されています。</p>`
      },
      {
        heading: `対策`,
        body: `<p>CSRF対策の基本は、正規の画面からの操作であることを確認する<b>CSRFトークン</b>（フォームに埋め込む予測不能な値で、リクエストごとにサーバー側と照合する）の検証と、Cookieに<code>SameSite=Lax</code>や<code>Strict</code>を設定して他サイトからのリクエストにCookieを付けない設定です。クリックジャッキング対策は、レスポンスヘッダーに<code>X-Frame-Options</code>や<code>Content-Security-Policy: frame-ancestors</code>を設定し、他サイトのiframeへの埋め込みを禁止します。SSRF対策は、外部から指定できるURLの宛先を許可リストで制限し、内部アドレス（プライベートIPやリンクローカルアドレス）へのアクセスを拒否することです。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、CSRF・SSRF・クリックジャッキングの定義を入れ替えた選択肢で正しい組み合わせを問う問題が出ます。科目Bでは、Webサービスの機能（画像URLを指定して取り込む機能など）が示され、「この機能がSSRFに悪用される理由」や「CSRFトークンをどこで検証すべきか」を記述させる出題が見られます。設問文中の機能説明から、どの攻撃が成立し得るかを見抜く読解力が問われます。</p>`
      }
    ],
    terms: [
      { term: "CSRF", desc: "ログイン中の利用者を罠サイト経由で操り、本人になりすました処理を正規サイトに実行させる攻撃。" },
      { term: "SSRF", desc: "サーバー自身に、本来アクセスできないはずの内部システムへリクエストさせる攻撃。" },
      { term: "クリックジャッキング", desc: "透明なiframe等で別サイトを重ね、利用者に意図しないクリックをさせる攻撃。" },
      { term: "CSRFトークン", desc: "正規の画面から送信されたリクエストであることを確認するための予測不能な値。" },
      { term: "SameSite属性", desc: "他サイトからのリクエストにCookieを送信するかを制御するCookie属性。" },
      { term: "X-Frame-Options", desc: "自サイトのページを他サイトのiframeに埋め込むことを制限するレスポンスヘッダー。" }
    ]
  },

  e4: {
    unitId: "e4",
    title: `セッション管理と認可の欠陥`,
    sections: [
      {
        heading: `セッションIDとCookie属性`,
        body: `<p>ログイン後、Webサーバーは利用者を識別するために<b>セッションID</b>を発行し、Cookieに保存させます。以降のリクエストはこのセッションIDで「誰か」を判断するため、セッションIDが漏れたり推測されたりすると、その利用者になりすまされてしまいます。セッションIDは十分に長く予測困難な乱数で生成し、URLに含めず必ずCookieで受け渡すのが基本です。Cookieには<code>Secure</code>（HTTPS通信でのみ送信）、<code>HttpOnly</code>（JavaScriptから読み取り不可）、<code>SameSite</code>（他サイトからの送信を制限）という属性を付けて保護します。さらに、一定時間操作がない場合にセッションを自動的に無効化する<b>セッションタイムアウト</b>を設けることで、放置されたログイン状態が悪用されるリスクを減らせます。</p>`
      },
      {
        heading: `認可の欠陥（IDOR）`,
        body: `<p>「認証されているか」だけでなく「その操作を行う権限があるか」を確認しないと、認可の欠陥が生まれます。代表例が<b>IDOR</b>（安全でない直接オブジェクト参照）です。URLやAPIのパラメータでリソースを指定する設計では、この確認漏れが起きやすいことを覚えておきましょう。</p>`,
        svg: `<svg viewBox="0 0 640 300" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="50" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="46" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">① 利用者Aが自分の請求書(id=1001)を閲覧</text>
<line x1="320" y1="66" x2="320" y2="78" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,78 326,78 320,86" fill="var(--grid)"/>
<rect x="70" y="86" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="116" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">② URLのidを1002に書き換えてリクエスト</text>
<line x1="320" y1="136" x2="320" y2="148" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,148 326,148 320,156" fill="var(--grid)"/>
<rect x="70" y="156" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="186" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③ サーバーが所有者を確認せずデータを返す</text>
<line x1="320" y1="206" x2="320" y2="218" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,218 326,218 320,226" fill="var(--grid)"/>
<rect x="70" y="226" width="500" height="50" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="320" y="256" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">④ 対策：所有者とログイン利用者の一致を毎回検証</text>
</svg>`
      },
      {
        heading: `セッションに関する攻撃`,
        body: `<p>セッションIDを盗む<b>セッションハイジャック</b>や、攻撃者が用意したセッションIDを利用者にログインさせて乗っ取る<b>セッション固定化攻撃</b>もあります。前者は通信の盗聴やXSSによるCookie窃取が主な経路、後者はログイン前にセッションIDを固定させる点が特徴です。いずれもログイン後にセッションIDを再発行する、通信をTLSで保護する、といった対策で防ぎます。特に、パスワード変更やログイン直後などの重要な操作の前後でセッションIDを再発行する設計は、両方の攻撃に対する共通の防御になります。</p>`
      },
      {
        heading: `対策`,
        body: `<p>認可の欠陥への根本対策は、リクエストのたびに「ログイン中の利用者」と「アクセスしようとしているデータの所有者・権限」が一致するかをサーバー側で必ず検証することです。URLやパラメータのIDを利用者が書き換えられることを前提に設計し、フロントエンド側の表示制御（ボタンを隠すなど）だけに頼らないようにします。</p>
<code>if (invoice.ownerId !== session.userId) return 403; // 所有者チェック</code>
<p>加えて、認可のチェック漏れを早期に発見するため、他人のリソースへのアクセス試行をログに記録し、異常な連続アクセスを監視することも有効です。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、Cookieの各属性（Secure/HttpOnly/SameSite）の役割を問う問題が出ます。科目Bでは、URLのパラメータを変えると他人の情報が見えてしまうシステムが題材となり、「なぜ閲覧できてしまうか」「どこにどのようなチェックを追加すべきか」を記述させる出題が定番です。画面上のボタン非表示だけでは対策にならない点を指摘させる設問もよく見られます。</p>`
      }
    ],
    terms: [
      { term: "セッションID", desc: "ログイン後に発行され、以降のリクエストで利用者を識別するための値。" },
      { term: "Secure属性", desc: "HTTPS通信のときだけCookieを送信するようにするCookie属性。" },
      { term: "HttpOnly属性", desc: "JavaScriptからのCookie読み取りを禁止するCookie属性。" },
      { term: "SameSite属性", desc: "他サイトからのリクエストにCookieを送信するかを制御するCookie属性。" },
      { term: "IDOR", desc: "安全でない直接オブジェクト参照。IDを書き換えるだけで他人のデータにアクセスできてしまう欠陥。" },
      { term: "セッションハイジャック", desc: "他人のセッションIDを盗み出し、その利用者になりすます攻撃。" },
      { term: "セッション固定化攻撃", desc: "攻撃者が用意したセッションIDで利用者にログインさせ、後からそのIDで乗っ取る攻撃。" },
      { term: "認可", desc: "認証された利用者が、特定の操作やデータへのアクセス権限を持つかどうかの判断。" }
    ]
  },

  e5: {
    unitId: "e5",
    title: `セキュアプログラミングと開発工程`,
    sections: [
      {
        heading: `なぜ開発工程全体で対策するのか`,
        body: `<p>脆弱性は、実装が終わってから発見するほど修正コストが高くなります。要件定義や設計段階で見つかる不備であれば設計変更で済みますが、リリース後に発見されると、コードの修正だけでなく、影響調査や利用者への周知、場合によっては損害賠償にまで発展します。そのため、開発の早い段階からセキュリティを組み込む考え方（<b>シフトレフト</b>）が重視されています。また、脆弱性の存在を前提に、検知した際の対応手順まであらかじめ定めておくことも、シフトレフトの一部として重要です。</p>`
      },
      {
        heading: `開発の各段階でのセキュリティ活動`,
        body: `<p>開発工程の各段階で、次のようなセキュリティ活動を行います。上流工程ほど手戻りのコストが小さく、下流に行くほど発見・修正のコストが大きくなる点を意識しておきましょう。</p>`,
        svg: `<svg viewBox="0 0 640 360" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="43" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">要件定義 ― 脅威モデリングで守るべき資産を洗い出す</text>
<line x1="320" y1="60" x2="320" y2="72" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,72 326,72 320,80" fill="var(--grid)"/>
<rect x="70" y="84" width="500" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="111" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">設計 ― セキュアデザインレビューを実施</text>
<line x1="320" y1="128" x2="320" y2="140" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,140 326,140 320,148" fill="var(--grid)"/>
<rect x="70" y="152" width="500" height="44" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="179" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">実装 ― 静的解析(SAST)でコードを検査</text>
<line x1="320" y1="196" x2="320" y2="208" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,208 326,208 320,216" fill="var(--grid)"/>
<rect x="70" y="220" width="500" height="44" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="247" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">テスト ― 脆弱性診断・ペネトレーションテストを実施</text>
<line x1="320" y1="264" x2="320" y2="276" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,276 326,276 320,284" fill="var(--grid)"/>
<rect x="70" y="288" width="500" height="44" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="320" y="315" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">運用 ― 継続的な監視とパッチ適用</text>
</svg>`
      },
      {
        heading: `代表的な検査手法（SAST/DAST）`,
        body: `<p>コードを検査する代表的な手法に、ソースコードを解析する<b>静的解析（SAST）</b>と、実際にアプリを動かして外部から検査する<b>動的解析（DAST）</b>があります。SASTは実行前に早期発見でき、開発中に継続的に実行しやすい一方、実行時の設定ミスや環境依存の問題は見つけられません。DASTは実際の挙動を確認できる分、テスト環境の準備や実行時間がかかります。両方を組み合わせ、開発の各段階で使い分けるのが基本です。近年はコンテナイメージやOSSライブラリの既知脆弱性を検出する<b>SCA（ソフトウェア構成分析）</b>も、SAST/DASTと並んで重要な検査手法になっています。</p>`
      },
      {
        heading: `脆弱性診断とレビュー`,
        body: `<p>設計段階では、設計書をもとに「誰が」「何を」「どう攻撃しうるか」を洗い出す<b>脅威モデリング</b>や、複数人でコード・設計をチェックする<b>セキュアデザインレビュー</b>を行います。リリース前には第三者による<b>脆弱性診断（ペネトレーションテスト）</b>を実施し、実際に攻撃を試みて弱点を確認します。診断で見つかった指摘事項は、重要度に応じて優先順位をつけて計画的に対応します。診断結果は担当者だけでなく開発チーム全体で共有し、同種の不備を他の機能でも作り込まないようにする再発防止の仕組みも重要です。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、SAST/DASTの違いや、脆弱性診断とペネトレーションテストの違いを問う問題が出ます。科目Bでは、スマートフォンアプリなどの開発プロジェクトが題材となり、「どの工程でどの対策を行うべきか」「レビューで指摘すべき設計上の不備」を記述させる出題が実際にありました（R7春）。開発の各フェーズと対策活動の対応関係を、自分の言葉で説明できるようにしておくことが得点につながります。</p>`
      }
    ],
    terms: [
      { term: "シフトレフト", desc: "開発の早い段階（左側の工程）からセキュリティ対策を組み込む考え方。" },
      { term: "脅威モデリング", desc: "設計をもとに、想定される脅威を体系的に洗い出す手法。" },
      { term: "セキュアデザインレビュー", desc: "複数人で設計やコードにセキュリティ上の不備がないか確認する活動。" },
      { term: "SAST", desc: "静的解析。ソースコードを実行せずに解析し脆弱性を検出する手法。" },
      { term: "DAST", desc: "動的解析。実際にアプリを動作させ外部から脆弱性を検出する手法。" },
      { term: "脆弱性診断", desc: "システムに実際に近い手法で疑似的な攻撃を行い、弱点を洗い出す診断。" },
      { term: "ペネトレーションテスト", desc: "実際の攻撃者の視点でシステムへの侵入を試み、対策の有効性を検証するテスト。" },
      { term: "SCA", desc: "ソフトウェア構成分析。使用しているOSSライブラリ等の既知脆弱性を検出する手法。" }
    ]
  },

  e6: {
    unitId: "e6",
    title: `スマホアプリ・APIのセキュリティ`,
    sections: [
      {
        heading: `モバイルアプリ特有のリスク`,
        body: `<p>スマートフォンアプリは端末側にプログラム本体が配布されるため、Webサーバーと違い、攻撃者が端末上でアプリを解析（<b>リバースエンジニアリング</b>）できてしまいます。アプリ内に埋め込んだ文字列や設定値は、専用ツールを使えば比較的容易に取り出せるため、アプリ内に埋め込んだ情報は「秘密」にならないという前提で設計する必要があります。そのため、パスワードやAPIキーのような秘密情報だけでなく、内部的な検証条件やロジックもアプリ内にはできる限り残さない設計が望まれます。</p>`
      },
      {
        heading: `APIの認可設計`,
        body: `<p>アプリはバックエンドのAPIを呼び出してデータをやり取りします。APIでも、Web同様に「誰が」「何に」アクセスできるかを1リクエストごとに検証する認可設計が必要です。あるユーザーのトークンで他のユーザーのIDを指定したデータが取得できてしまう不備がよく問題になります。特にモバイルアプリでは、複数のAPIエンドポイントを個別に実装するうちにチェックが漏れる箇所が生まれやすいため、共通のチェック処理として一箇所にまとめておくことが有効です。認可の確認はサーバー側だけで行い、アプリ側の表示制御（ボタンを隠す等）を「対策」として扱わないことが基本です。</p>`
      },
      {
        heading: `シークレット管理の落とし穴`,
        body: `<p>APIキーやシークレットをアプリ内に直接埋め込むと、解析によって抜き取られてしまいます。抜き取られたキーが管理者用の強い権限を持つものであれば、被害はアプリ利用者全体に及びます。</p>`,
        svg: `<svg viewBox="0 0 640 300" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="46" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">① アプリ内にAPIキーやシークレットを直接埋め込む</text>
<line x1="320" y1="66" x2="320" y2="78" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,78 326,78 320,86" fill="var(--grid)"/>
<rect x="70" y="86" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="116" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">② 攻撃者がアプリを解析(リバースエンジニアリング)</text>
<line x1="320" y1="136" x2="320" y2="148" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,148 326,148 320,156" fill="var(--grid)"/>
<rect x="70" y="156" width="500" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="186" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③ 抽出したキーでAPIに直接アクセスしデータ取得</text>
<line x1="320" y1="206" x2="320" y2="218" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,218 326,218 320,226" fill="var(--grid)"/>
<rect x="70" y="226" width="500" height="50" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="320" y="256" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">④ 対策：シークレットはサーバー管理、短命なトークンを発行</text>
</svg>`
      },
      {
        heading: `対策のポイント`,
        body: `<p>対策としては、シークレットはサーバー側だけで保持し、アプリには有効期限が短い<b>アクセストークン</b>を発行する、トークンは端末のセキュアな領域（Keychain/Keystoreなど）に保存する、通信は必ずTLSで保護し証明書の検証を省略しない、といった点が基本です。アクセストークンの有効期限が切れた際は、<b>リフレッシュトークン</b>を使って再発行する仕組みにし、パスワードを都度送信させない設計にします。また、OSが提供する生体認証などの機能と連携し、端末を紛失した場合でもトークンが第三者に悪用されにくい設計にすることも有効です。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、モバイルアプリのAPIキー管理やトークンの扱いに関する問題が出題されています。科目Bでは、スマートフォンアプリ開発を題材に、「アプリ内に何を埋め込むべきでないか」「APIの認可不備をどう見つけ修正するか」を記述させる出題がありました（R7春）。設計レビューの観点から不備を指摘させる出題形式にも慣れておくとよいでしょう。</p>`
      }
    ],
    terms: [
      { term: "リバースエンジニアリング", desc: "配布されたアプリを解析し、内部の処理やデータを復元・抽出する行為。" },
      { term: "アクセストークン", desc: "APIへのアクセス許可を表す、有効期限が短い認証情報。" },
      { term: "リフレッシュトークン", desc: "アクセストークンの有効期限が切れた際に、新しいトークンを再発行するための情報。" },
      { term: "Keychain/Keystore", desc: "スマートフォンOSが提供する、トークンなどの機密情報を安全に保存する専用領域。" },
      { term: "API認可", desc: "APIへのリクエストごとに、要求元が対象データへアクセスする権限を持つか検証すること。" },
      { term: "シークレット管理", desc: "APIキーや鍵などの機密情報を、安全に保管・受け渡しする仕組み全般。" }
    ]
  }
});
