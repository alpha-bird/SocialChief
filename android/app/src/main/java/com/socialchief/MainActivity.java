package com.socialchief;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;

import br.com.vizir.rn.paypal.PayPalPackage; // <--
import br.com.vizir.rn.paypal.PayPal; // <--
import android.content.Intent; // <--
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    private static final int PAY_PAL_REQUEST_ID = 9; // <-- Can be any unique number
    private PayPalPackage payPalPackage; // <--

    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    private LifecycleState mLifecycleState = LifecycleState.BEFORE_RESUME;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            // Get permission to show redbox in dev builds.
            if (!Settings.canDrawOverlays(this)) {
                Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                startActivity(serviceIntent);
            }
        }
        // ...
        payPalPackage = new PayPalPackage(this, PAY_PAL_REQUEST_ID); // <--
        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                // ...
                .addPackage(payPalPackage) // <--
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(mLifecycleState)
                .build();
        // ...
        mReactRootView.startReactApplication(mReactInstanceManager, "SocialChief", null);

        setContentView(mReactRootView);
    }
    @Override
    protected void onPause() {
        super.onPause();

        mLifecycleState = LifecycleState.BEFORE_RESUME;

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        mLifecycleState = LifecycleState.RESUMED;

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        mReactRootView.unmountReactApplication();
        mReactRootView = null;

        if (mReactInstanceManager != null) {
            mReactInstanceManager.destroy();
        }
    }

    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onActivityResult(this, requestCode,
                    resultCode, data);
        }
        if (requestCode == PAY_PAL_REQUEST_ID) {
            payPalPackage.handleActivityResult(requestCode, resultCode, data); // <--
        } else {
            //otherModulesHandlers(requestCode, resultCode, data);
        }
    }
    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        }
        else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
