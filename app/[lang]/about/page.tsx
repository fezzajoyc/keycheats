import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CONTENT: Partial<Record<Locale, string[]>> = {
  en: [
    "KeyCheats is a collection of keyboard shortcut reference sheets that run entirely in your browser. There is no backend: the whole shortcut dataset ships with the page, and search, OS detection, keycap rendering and conflict checks are all executed by JavaScript on your own device.",
    "That design gives us three properties we care about. It is private by construction — there is nothing to send anywhere, so nothing can leak. It is fast — there is no round trip to a server. And it is accurate — every sheet is a structured dataset checked against official documentation, not a copy of a copy of a 2019 blog post.",
    "The shortcut data covers five apps: VS Code, macOS, Windows, Chrome and GitHub. Each shortcut carries a real description, is grouped inside its app, and shows the keys for the operating system you are on. Around the sheets sit the key visualizer and the shortcut conflict checker — small tools for people who spend their day on a keyboard.",
  ],
  zh: [
    "KeyCheats 是一组完全在浏览器里运行的键盘快捷键速查表。没有后端:整个快捷键数据集随页面一起加载,搜索、系统识别、键帽渲染和冲突检查都由你自己设备上的 JavaScript 完成。",
    "这个设计带来三个我们看重的性质:隐私是构造出来的——没有任何东西需要发送,就谈不上泄露;速度快——没有服务器往返;准确——每张表都是对照官方文档核对的结构化数据,不是 2019 年博客文章的二次转载。",
    "快捷键数据覆盖五个应用:VS Code、macOS、Windows、Chrome、GitHub。每条快捷键都带真实说明,在应用内按分类分组,并按你所在的操作系统显示按键。速查表之外还有按键可视化和快捷键冲突检查——为整天泡在键盘上的人准备的小工具。",
  ],
  ja: [
    "KeyCheats は、完全にブラウザ内で動くキーボードショートカット早見表のコレクションです。バックエンドはありません。ショートカットのデータセット全体がページに同梱され、検索・OS 判定・キーキャップ描画・競合チェックはすべて自分のデバイス上の JavaScript が処理します。",
    "この設計には、私たちが大切にする 3 つの性質があります。プライバシーは構造的に保証される(送信するものがないので漏えいもない)、速い(サーバー往復がない)、そして正確(各表は公式ドキュメントと照合した構造化データで、2019 年のブログの二番煎じではない)。",
    "ショートカットデータは VS Code・macOS・Windows・Chrome・GitHub の 5 アプリを網羅します。すべてのショートカットに解説が付き、アプリ内で分類され、今使っている OS のキーが表示されます。早見表に加えて、キービジュアライザーと競合チェッカー——一日中キーボードに向かう人のための小さな道具です。",
  ],
  es: [
    "KeyCheats es una colección de hojas de referencia de atajos de teclado que funciona por completo en tu navegador. No hay backend: todo el conjunto de atajos viaja con la página, y la búsqueda, la detección de OS, el dibujo de teclas y las comprobaciones de conflictos los ejecuta el JavaScript de tu propio dispositivo.",
    "Ese diseño nos da tres propiedades que nos importan. Privacidad por construcción: no hay nada que enviar, así que no puede haber fugas. Velocidad: sin viajes al servidor. Precisión: cada hoja es un conjunto de datos estructurado cotejado con documentación oficial, no una copia de una copia de un blog de 2019.",
    "Los datos cubren cinco apps: VS Code, macOS, Windows, Chrome y GitHub. Cada atajo lleva una descripción real, se agrupa dentro de su app y muestra las teclas del sistema que estés usando. Junto a las hojas viven el visualizador de teclas y el detector de conflictos — herramientas pequeñas para quien pasa el día al teclado.",
  ],
  pt: [
    "KeyCheats é uma coleção de folhas de referência de atalhos de teclado que roda inteiramente no seu navegador. Não há backend: todo o conjunto de atalhos vem com a página, e a busca, a detecção de OS, o desenho de teclas e a verificação de conflitos são executados pelo JavaScript do seu próprio dispositivo.",
    "Esse design nos dá três propriedades que valorizamos. Privacidade por construção: não há nada para enviar, logo não há vazamentos. Velocidade: sem viagem ao servidor. Precisão: cada folha é um conjunto de dados estruturado conferido com documentação oficial, não uma cópia de uma cópia de um post de 2019.",
    "Os dados cobrem cinco apps: VS Code, macOS, Windows, Chrome e GitHub. Cada atalho tem uma descrição real, é agrupado dentro do seu app e mostra as teclas do sistema que você usa. Junto das folhas ficam o visualizador de teclas e o verificador de conflitos — ferramentas pequenas para quem passa o dia no teclado.",
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead title={t.nav.about} />
      <Prose paragraphs={CONTENT[lang as Locale] ?? CONTENT.en!} />
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} tools · {LOCALES.length} languages
      </p>
    </Container>
  );
}
