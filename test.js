const handleFinish = () => {
  if (!formState.wallet) {
    alert("Please select a wallet");
    return;
  }

  isLoading.value = true;
  window.api.createSubnet(formState).then((str) => {
    isLoading.value = false;
    alert("Subnet " + str + " created successfully");
    dispatch("getSubnets");
  });
};