/** Normalise une chaîne pour la comparaison (minuscules, sans accents, sans ponctuation) */
export function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

function matchOne(input, ref) {
  if (ref.trim() === "") return input === "";
  const refN = normalize(ref);
  if (!refN) return false;
  if (/^\d+$/.test(refN)) return input === refN;
  return input.includes(refN);
}

/** Vérifie si la réponse est correcte (accepte un tableau de réponses) */
export function isCorrect(input, answer) {
  const inp = normalize(input);
  const answers = Array.isArray(answer) ? answer : [answer];
  return answers.some(a => matchOne(inp, a));
}
