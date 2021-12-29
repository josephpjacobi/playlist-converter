import { Builder, By, Key } from "selenium-webdriver";
import chromeDriver from "chromedriver";

async function example() {
	let driver = await new Builder().forBrowser("chrome").build();
	await driver.get("http://google.com");
	await driver
		.findElement(By.name("q"))
		.sendKeys("Selenium Test", Key.RETURN);
}

example();
