import basicProfile from '../../assets/image/profile/img_profile_basic.svg';

export const FONTS = [
  { text: 'Noto Sans', id: 1 },
  { text: 'Pretendard', id: 2 },
  { text: '나눔명조', id: 3 },
  { text: '나눔손글씨 손편지체', id: 4 },
];

export const MEMBERS = [
  { text: '지인', id: 1 },
  { text: '친구', id: 2 },
  { text: '동료', id: 3 },
  { text: '가족', id: 4 },
];

export const PROFILES = [
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043232-avatar-batman-comics-hero_113278.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043233-anime-away-face-no-nobody-spirited_113254.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043272-avatar-lazybones-sloth-sluggard_113274.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043270-avatar-joker-squad-suicide-woman_113256.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043250-avatar-child-girl-kid_113270.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043251-avatar-female-girl-woman_113291.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/96/4043260-avatar-male-man-portrait_113269.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/96/4043255-beard-hipster-male-man_113243.png',
    alt: '프로필 이미지',
  },
  {
    src: 'https://cdn.icon-icons.com/icons2/1736/PNG/96/4043276-christmas-clous-santa_113290.png',
    alt: '프로필 이미지',
  },
];

export const getFormData = (
  id,
  senderInputRef,
  profileOptionsRef,
  relationshipOptionsRef,
  contentTextareaRef,
  fontOptionsRef,
) => ({
  team: '6-6',
  recipientId: id,
  sender: senderInputRef.current,
  profileImageURL:
    profileOptionsRef.current.value ||
    'https://raw.githubusercontent.com/6Team-Project/MessageBloom/a7f2c89408ceed7a9abaee3f603e137b638cae34/src/assets/image/profile/img_profile_basic.svg',
  relationship: relationshipOptionsRef.current || MEMBERS[0].text,
  content: contentTextareaRef.current,
  font: fontOptionsRef.current || FONTS[0].text,
});
