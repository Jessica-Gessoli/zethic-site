"""Check the static homepage locally, without network or dependencies."""
import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.tags = []
        self.ids = []
        self.schema = []
        self.in_schema = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_schema = True

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_schema = False

    def handle_data(self, data):
        if self.in_schema:
            self.schema.append(data)


def main() -> None:
    text = (ROOT / 'index.html').read_text(encoding='utf-8')
    page = Page()
    page.feed(text)
    assert ('html', {'lang': 'pt-BR'}) in page.tags
    assert sum(tag == 'h1' for tag, _ in page.tags) == 1
    assert len(page.ids) == len(set(page.ids))
    assert any(tag == 'meta' and a.get('name') == 'viewport' for tag, a in page.tags)
    assert any(tag == 'link' and a.get('rel') == 'canonical' and a.get('href') == 'https://zethic.net/' for tag, a in page.tags)
    assert any(tag == 'meta' and a.get('property') == 'og:url' and a.get('content') == 'https://zethic.net/' for tag, a in page.tags)
    services = {'presenca-digital', 'projetos-digitais', 'fotografia', 'audiovisual', 'eventos', 'ciberseguranca', 'cameras'}
    assert services.issubset(page.ids)
    for _, attrs in page.tags:
        href = attrs.get('href', '')
        if href.startswith('#'):
            assert href[1:] in page.ids, f'Broken anchor: {href}'
        assert 'zethic.com' not in href
        assert 'drive.google.com' not in href and 'docs.google.com' not in href
        assert 'digital-twin-fase0' not in href
    data = json.loads(''.join(page.schema))
    assert data['url'] == 'https://zethic.net/' and data['@type'] == 'Organization'
    assert data['sameAs'] == ['https://www.linkedin.com/company/144656905/', 'https://www.instagram.com/zethic_net/']
    for forbidden in ('streetAddress', 'postalCode', 'latitude', 'longitude', 'aggregateRating'):
        assert forbidden not in text
    assert 'mailto:jessica.gessoli@zethic.net' in text
    assert 'tel:+5519981800221' in text
    print('PASS: 7 service groups; metadata, JSON, anchors, contacts and privacy checks.')


if __name__ == '__main__':
    main()
