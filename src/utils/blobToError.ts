//TODO: util에 있는 거 안쓰면 지우기
export const getErrorDataFromBlob = async (blob: Blob): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsText(blob);
  });
};
