import AvatarSpecs from 'shared/avatar/AvatarSpecs';

export function isAvatarMeasurementsEquivalent(a, b) {
  const fields = AvatarSpecs.getAvatarMeasurementsFields();
  return fields.every((key) => {
    return a.get(key) === b.get(key);
  });
}

export function isAvatarCharactersEquivalent(a, b) {
  const fields = AvatarSpecs.getAvatarCharactersFields();
  return fields.every((key) => {
    return a.get(key) === b.get(key);
  });
}

export function isAvatarEquivalent(a, b) {
  const isMeasurementsEquivalent = isAvatarMeasurementsEquivalent(a, b);
  const isCharactersEquivalent = isAvatarCharactersEquivalent(a, b);

  return isMeasurementsEquivalent && isCharactersEquivalent;
}

