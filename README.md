# react-native-dropdown-android

A simple wrapper for Android's Spinner

## Installation Android
1. `npm install --save react-native-dropdown-android`
2. In `android/setting.gradle`

```gradle
...
include ':ReactNativeDropdownAndroid', ':app'
project(':ReactNativeDropdownAndroid').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-dropdown-android/android')
```

3. In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':ReactNativeDropdownAndroid')
}
```

4. register module (in MainActivity.java)

```java
import com.chymtt.reactnativedropdown.DropdownPackage; // <----- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new DropdownPackage())              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }
  ......
}
```

## Usage

```js

var Dropdown = require('react-native-dropdown-android');
...

  render() {
    return (
      <Dropdown
        style={{ height: 20, width: 200}}
        values={[ '--Choose--', 'one', 2, 3.5, { four: 4 }, [ 5, 6, 7 ], false ]} selected={1} />
    );
  }
```

## Props

### style

Right now you should always and only provide its height and width, otherwise the dropdown won't show up at all

### values

An array of options. This should be provided with an __array of strings__. Any type other than string will be converted to its string representation

### selected

An int indicating which option (zero-based) is currently selected

## Questions or suggestions?

Feel free to [open an issue](https://github.com/chymtt/ReactNativeDropdownAndroid/issues)
[Pull requests](https://github.com/chymtt/ReactNativeDropdownAndroid/pulls) are also welcome