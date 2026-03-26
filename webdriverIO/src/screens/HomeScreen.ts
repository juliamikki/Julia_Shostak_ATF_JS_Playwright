import { BaseScreen } from '#screens';

export class HomeScreen extends BaseScreen {
  public get mainHeader(): ChainablePromiseElement {
    return $("//p[text()='EasyRPA Control Server']");
  }
}
