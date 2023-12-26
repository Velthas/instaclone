// Copies a link to the full post to the clipboard
const copyPostUrlToClipboard = (username: string, postid: string) => {
  const url = `https://velstaclone.web.app/posts/${username}/${postid}`;
  navigator.clipboard.writeText(url);
  alert("Post URL has been copied to your clipboard.");
};

// This triggers the native share feature of the device.
// It doesn't work on Firefox and Internet Explorer, might have to come back and implement fallback later.
// Not a priority at the moment.
const openNativeShare = (username: string, postid: string) => {
  if (navigator.share) { // Fallback will be added on else eventually
    navigator.share({
      title: "Your Post",
      url: `https://velstaclone.web.app/posts/${username}/${postid}`,
      text: "Hey, check this post over at this terrible instagram clone!",
    });
  }
};

export { copyPostUrlToClipboard, openNativeShare };
