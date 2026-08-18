# IPA過去問PDF → ドリル用データ(.js)の半自動変換ツール
#
# 使い方:
#   1. IPAサイト(https://www.ipa.go.jp/shiken/mondai-kaiotu/)から
#      午前II問題PDFと解答例PDFをダウンロードする
#   2. pip install pypdf
#   3. python tools/pdf2json.py 問題.pdf > 抽出テキスト.txt
#   4. 抽出テキスト.txtをClaude等に渡し、data/questions-a/ 内の既存ファイル
#      (例: r07_aki.js) と同じ形式に整形してもらう
#      ※ そのとき「answerは解答例PDFと照合すること」「explanationは自作すること」
#        「unitIdは data/units.js のUNITSから選ぶこと」を必ず指示する
#   5. できた .js を data/questions-a/ に置き、index.html に
#      <script src="data/questions-a/新ファイル.js"></script> を1行追加する
#
# ※ PDFのレイアウトによっては選択肢の区切りが崩れるため、
#    完全自動ではなく「テキスト抽出まで」をこのツールが担当する。

import sys

try:
    from pypdf import PdfReader
except ImportError:
    print("pypdf が必要です。`pip install pypdf` を実行してください。", file=sys.stderr)
    sys.exit(1)


def main():
    if len(sys.argv) < 2:
        print("使い方: python tools/pdf2json.py <PDFファイル>", file=sys.stderr)
        sys.exit(1)
    reader = PdfReader(sys.argv[1])
    for i, page in enumerate(reader.pages, 1):
        print(f"===== {i}ページ =====")
        print(page.extract_text() or "(テキスト抽出不可のページ)")
        print()


if __name__ == "__main__":
    main()
