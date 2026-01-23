```markdown
  1. Module Federation Configuration

  File: apps/ctint-mf-cdss/next.config.js

  Add the autotnc remote entry in the remotes object:

  const remotes = (location) => {
    return {
      // ... other remotes
      autotnc: `autotnc@${getMFPath('ctint-mf-autotnc').url}/_next/static/${location}/remoteEntry.js`,
    };
  };

  ---
  2. Dynamic Import

  File: apps/ctint-mf-cdss/pages/index.tsx

  Add the dynamic import for AutoTncMain component:

  // @ts-expect-error: Can't type check dynamic imports
  const AutoTncMain = dynamic(() => import('autotnc/main'), {
    ssr: false,
    loading: () => <LoadingBlock />,
  }) as any;

  ---
  3. Route Configuration

  File: apps/ctint-mf-cdss/pages/index.tsx

  Add two route entries in the routes array passed to PageRenderer:

  {
    path: '/autotnc',
    group: 'ctint-mf-autotnc',
    component: (
      <AuthLoginChecker>
        <AutoTncMain />
      </AuthLoginChecker>
    ),
  },
  {
    path: '/autotnc/transactions/detail',
    group: 'ctint-mf-autotnc',
    component: (
      <AuthLoginChecker>
        <AutoTncMain />
      </AuthLoginChecker>
    ),
  },

  Important: Both routes render the same AutoTncMain component. The autotnc module handles internal routing based on the URL
  path to display either the main layout or transaction detail page.

  ---
  4. Global Config

  Ensure the autotnc microfrontend configuration exists:

  microfrontends:
    ctint-mf-autotnc:
      host: http://localhost:4900  # <--- should be deployed domain path
      basepath: /ctint/mf-autotnc
```


tag release-shacom-image-mf-autotnc-xxxx