// A newly published card changes a collection page even when its editorial copy
// is unchanged. Use publication dates, not build time or child-body review dates:
// reviewing an older article does not necessarily change its listing card.
export function collectionUpdated(editorialDate, entries) {
  return entries.reduce((latest, entry) => entry.date > latest ? entry.date : latest, editorialDate);
}
