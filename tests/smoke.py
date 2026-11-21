from pathlib import Path
import json, subprocess, sys
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent

def test_data():
    import runpy
    runpy.run_path(str(ROOT/'tests/catalog.py'))

def main():
    test_data()
    server=subprocess.Popen([sys.executable,'-m','http.server','8765','--directory',str(ROOT)],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch()
            page=browser.new_page(viewport={'width':390,'height':844})
            errors=[];page.on('pageerror',lambda error: errors.append(str(error)))
            base='http://127.0.0.1:8765/'
            page.goto(base);page.wait_for_selector('.project')
            assert page.locator('.project').count()==55
            assert page.locator('html').get_attribute('dir')=='rtl'
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
            page.locator('#filters button').nth(1).click()
            assert 0<page.locator('.project').count()<55
            page.goto(base+'shop-lane/');page.wait_for_selector('.product')
            assert page.locator('.product').count()==24
            page.locator('[data-add]').first.click();page.locator('#cartButton').click()
            page.locator('#checkout').click();assert page.locator('#checkoutMessage').inner_text()
            page.locator('#closeCart').click();page.locator('#techCollection').click()
            page.wait_for_function('document.querySelectorAll(".product").length===4238')
            for project in json.loads((ROOT/'projects.json').read_text()):
                page.goto(base+project[0]+'/')
                assert page.locator('html').get_attribute('dir')=='rtl'
            assert not errors,errors
            browser.close()
            print('Arabic gallery, catalog, demo cart and all 25 application pages passed.')
    finally:
        server.terminate();server.wait()

if __name__=='__main__':main()
