const modalContents = [
  {
    id: "modal-1",
    title: "モーダル１です",
    content: "モダール１のコンテンツ"
  },
  {
    id: "modal-2",
    title: "モーダル2です",
    content: "モダール2のコンテンツ"
  },
  {
    id: "modal-3",
    title: "モーダル3です",
    content: "モダール3のコンテンツ"
  }
];
export const GetModalContents = (id: string) => {
  const modalContent = modalContents.filter((x) => x.id === id);
  return modalContent;
};
