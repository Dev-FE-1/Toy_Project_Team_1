const submitMileageData = async (formData) => {
  try {
    const response = await fetch('/api/mileage/apply', {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting mileage application:', error);
    throw error;
  }
};

export default submitMileageData;
