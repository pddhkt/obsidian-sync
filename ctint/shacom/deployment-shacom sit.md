```json
  Step 1: SSH to the server:
  ssh -i /home/lmt/Projects/work/shacom/cdss3-project-dev-k3s-cluster01_key.pem azureuser@20.2.136.120

  Step 2: Switch to root and navigate to the directory:
  sudo su
  cd /app/k3s/ctint_installnation

  Step 3: Edit the Chart.yaml and update appVersion:
  vi ./chart_set/chart_repo/ctint-tts/all/ctint-mf-autotnc/Chart.yaml
  Change appVersion to: release-shacom-image-mf-autotnc-2026011301

  Step 4: Run the helm scripts:
  cd upload_file
  ./b_helm_preCheck.sh
  ./c_run_helm_upgrade.sh

  Step 5: Verify the deployment:
  kubectl get pod -n ctint-shacom | grep mf-autotnc

  Should show 1/1 Running status. Let me know if you hit any issues.
```

```json
 Deployment steps for TTS are the same:

  1. Push tag to repo (format: release-shacom-image-mf-tts-YYYYMMDDXX)
  2. Wait for build
  3. SSH to server:
  ssh -i /home/lmt/Projects/work/shacom/cdss3-project-dev-k3s-cluster01_key.pem azureuser@20.2.136.120
  4. Update Chart.yaml:
  sudo su
  cd /app/k3s/ctint_installnation
  vi ./chart_set/chart_repo/ctint-tts/all/ctint-mf-tts/Chart.yaml
  5. Update appVersion with your new tag.
  6. Run helm scripts:
  cd upload_file
  ./b_helm_preCheck.sh
  ./c_run_helm_upgrade.sh
  7. Verify:
  kubectl get pod -n ctint-shacom | grep mf-tts

  Since TTS is in apps/ (not projects/), the Dockerfile paths should work correctly without the extra rsync/symlink fixes we needed for autotnc.


```