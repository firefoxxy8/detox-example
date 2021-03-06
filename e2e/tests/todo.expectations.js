const PageObjectModel = require('./../pageObjects/todo.matchers');

/**
 * This suit of tests aims to provide some example of the APIs concerning
 * assertions provided by Detox.
 * The full list of methods is available here : https://github.com/wix/detox/blob/master/docs/APIRef.Expect.md
 */
describe('Expectations', () => {
  let po;

  let inputAdder;
  let touchableAdder;
  let unknownComponent;
  let getMarriedTodo;
  let switchHideChecked;
  let textAdd;

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  beforeEach(async () => {
    po = PageObjectModel(element);

    inputAdder = po.inputAdder;
    touchableAdder = po.touchableAdder;
    unknownComponent = po.unknownComponent;
    getMarriedTodo = po.getMarriedTodo;
    switchHideChecked = po.switchHideChecked;
    textAdd = po.textAdd;
  });

  describe('.toBeVisible()', () => {
    it('should have a visible "Add" button when a text is filled in the input field', async () => {
      await inputAdder.tap();
      await inputAdder.typeText('Item');
      await expect(touchableAdder).toBeVisible();
    });
  });

  describe('.toBeNotVisible()', () => {
    it('should not have a visible "Add" button when no text is filled in the input field', async () => {
      await expect(touchableAdder).toBeNotVisible();
    });
  });

  describe('.toExist()', () => {
    it('should have an existing inputAdder component', async () => {
      await expect(inputAdder).toExist();
    });
  });

  describe('.toNotExist()', () => {
    it('shouldnt have a component with the testID unknownComponent', async () => {
      await expect(unknownComponent).toNotExist();
    });
  });

  describe('.toHaveText()', () => {
    it('should have the textAdd with a text equals to "Add"', async () => {
      await inputAdder.tap();
      await inputAdder.typeText('Item');
      await expect(textAdd).toHaveText('Add');
    });
  });

  describe('.toHaveId()', () => {
    it('should have a testID equals to todo-15 while searching for "Do : Get married"', async () => {
      await expect(getMarriedTodo).toHaveId('todo-15');
    });
  });

  describe('.toHaveValue()', () => {
    it('should have the switch for hide checked to have a default value of 0', async () => {
      /**
       * We can't use boolean to make test assertion while using a switch
       * Switch, with Detox and RN, use '0' or '1' to determine its value
       */
      await expect(switchHideChecked).toHaveValue('0');
    });

    it('should have the switch with a value of 1 when it has been switched', async () => {
      await switchHideChecked.tap();
      /**
       * We can't use boolean to make test assertion while using a switch
       * Switch, with Detox and RN, use '0' or '1' to determine its value
       */
      await expect(switchHideChecked).toHaveValue('1');
    });
  });
});
