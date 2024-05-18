export default function getClassByRole(role) {
  switch (role) {
    case '동료':
      return 'collegue';
    case '친구':
      return 'friend';
    case '가족':
      return 'family';
    case '지인':
      return 'known';
  }
}
