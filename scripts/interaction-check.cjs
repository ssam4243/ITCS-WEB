const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const origin = new URL(process.env.ITCS_TEST_URL || 'http://127.0.0.1:5173/');
const path = value => new URL(value, origin).pathname;
const slugs = ['it-support','cyber-security','telecoms','networks','software-websites','digital-marketing'];

(async () => {
  const browser = await chromium.launch({ headless:true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH} : {}) });
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(origin.href);
    await page.getByRole('button',{name:'Essential only'}).click();
    assert.equal(await page.locator('.orbit-node').count(),0);
    assert.equal(await page.locator('.experience-hero [data-goal]').count(),0);
    assert.equal(await page.locator('.experience-hero .hero-actions .button').count(),1);
    await page.getByRole('button',{name:'Open service folder',exact:true}).click();
    assert.equal(await page.locator('.folder-pocket').getAttribute('aria-expanded'),'true');
    assert.equal(await page.locator('.file-stack').evaluate(el=>el.inert),false);

    for(let i=0;i<6;i++) {
      if(await page.locator('.folder-all').isVisible()) await page.locator('.folder-all').click();
      await page.locator(`[data-engine="${i}"]`).click();
      assert.equal(await page.locator('#engine-link').getAttribute('href'),path('services/'+slugs[i]));
      assert.equal(await page.locator('#folder-capabilities li').count(),3);
      assert.ok((await page.locator('#engine-description').innerText()).length>60);
      assert.equal(await page.locator('.file-stack').evaluate(el=>el.inert),true);
      assert.equal(await page.locator(`[data-engine="${i}"]`).getAttribute('aria-pressed'),'true');
    }
    await page.getByRole('button',{name:'Previous service',exact:true}).click();
    assert.equal(await page.locator('#engine-link').getAttribute('href'),path('services/software-websites'));
    await page.getByRole('button',{name:'Next service',exact:true}).click();
    assert.equal(await page.locator('#engine-link').getAttribute('href'),path('services/digital-marketing'));
    // The selected paper really drags, then returns to its resting position.
    await page.locator('.file-grab').hover();
    const grip=await page.locator('.file-grab').boundingBox();
    const rest=await page.locator('.folder-extracted').boundingBox();
    await page.mouse.move(grip.x+grip.width/2,grip.y+grip.height/2);await page.mouse.down();
    await page.mouse.move(grip.x+grip.width/2+25,grip.y+grip.height/2+18,{steps:6});
    const moved=await page.locator('.folder-extracted').boundingBox();assert.ok(moved.x>rest.x+5);
    await page.mouse.up();
    await page.waitForFunction(x=>Math.abs(document.querySelector('.folder-extracted').getBoundingClientRect().x-x)<1,rest.x);

    await page.evaluate(()=>{window.itcsEvents=[];window.addEventListener('itcs:interaction',e=>window.itcsEvents.push(e.detail));});
    for(const [goal,index] of [['reliability',0],['security',1],['connection',2],['digital',4]]){
      await page.locator(`[data-goal="${goal}"]`).click();
      assert.equal(await page.locator(`[data-goal="${goal}"]`).getAttribute('aria-pressed'),'true');
      assert.match(await page.locator('#engine-description').innerText(),/^Start with/);
      assert.equal(await page.locator('#engine-link').getAttribute('href'),path('services/'+slugs[index]));
      assert.equal(await page.locator('#panel-link').getAttribute('href'),path('services/'+slugs[index]));
    }
    assert.equal((await page.evaluate(()=>window.itcsEvents)).filter(e=>e.action==='choose-goal').length,4);
    await page.locator('[data-goal="security"]').click();
    await page.locator('#engine-link').click();
    await page.waitForURL(u=>u.pathname===path('services/cyber-security'));
    await page.getByRole('link',{name:'Talk about cyber security'}).click();
    assert.equal(await page.locator('[name=service]').inputValue(),'cyber-security');
    await page.locator('.logo').first().click();
    await page.locator('.folder-pocket').focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('[data-engine="0"]').evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-engine="1"]').evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#engine-title').evaluate(el=>el===document.activeElement),true);
    assert.equal(await page.locator('#engine-title').innerText(),'Cyber security');
    await page.keyboard.press('Escape');assert.equal(await page.locator('.folder-module').getAttribute('data-folder-state'),'open');
    await page.keyboard.press('Escape');assert.equal(await page.locator('.folder-module').getAttribute('data-folder-state'),'closed');

    await page.locator('[data-goal="security"]').click();
    await page.locator('.motion-control').click();
    assert.match(await page.locator('.motion-control').innerText(),/Play motion/);
    assert.equal(await page.locator('.folder-module').getAttribute('data-folder-state'),'selected');
    assert.match(await page.locator('#engine-description').innerText(),/^Start with/);
    await page.locator('#expertise').scrollIntoViewIfNeeded();
    await page.locator('.conversation-dock').waitFor({state:'visible'});
    assert.equal(await page.locator('#dock-link').getAttribute('href'),path('contact')+'?service=cyber-security');
    await page.getByRole('button',{name:'Hide conversation shortcut'}).click();
    assert.equal(await page.locator('.conversation-dock').isVisible(),false);

    for(const width of [1440,1024,820,800,768,390,375,320]){
      await page.setViewportSize({width,height:1000});await page.goto(origin.href);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Closed overflow '+width);
      await page.locator('.folder-pocket').click();
      const button=width<=1100?page.locator('[data-folder-choose="1"]'):page.locator('[data-engine="1"]');
      await button.click();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Selected overflow '+width);
      const card=await page.locator('.folder-extracted').boundingBox();const view=await page.locator('.folder-viewport').boundingBox();
      assert.ok(card.y+card.height<=view.y+view.height+1,'Card clips at '+width);
    }
    const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
    const touch=await mobile.newPage();touch.on('pageerror',e=>errors.push(e.message));
    await touch.goto(origin.href);await touch.getByRole('button',{name:'Essential only'}).click();
    await touch.getByRole('button',{name:'Open service folder',exact:true}).tap();
    assert.equal(await touch.locator('[data-folder-choose]').count(),6);
    await touch.locator('.folder-mobile-close').tap();
    assert.equal(await touch.locator('.folder-module').getAttribute('data-folder-state'),'closed');
    await touch.getByRole('button',{name:'Open service folder',exact:true}).tap();
    await touch.locator('[data-folder-choose="1"]').tap();
    assert.equal(await touch.locator('#engine-title').innerText(),'Cyber security');
    assert.match(await touch.locator('.motion-control').innerText(),/Reduced motion on/);
    await touch.getByRole('button',{name:'Return card to folder'}).tap();
    assert.equal(await touch.locator('.folder-module').getAttribute('data-folder-state'),'open');
    await touch.locator('[data-folder-choose="3"]').tap();
    await touch.locator('#engine-link').tap();await touch.waitForURL(u=>u.pathname===path('services/networks'));
    assert.deepEqual(errors,[]);
    console.log('PASS: six card extractions, drag/spring return, previous/next, four goal journeys, service-to-enquiry navigation, keyboard open/select/return/close, pause state, contextual shortcut, eight widths, mobile touch and reduced motion, no JS errors.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exit(1);});
