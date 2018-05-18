function findFirstRelative(j, root) {
  let firstRelativeImport;
  root.find(j.ImportDeclaration)
    .some(p => {
      // fallback to the last import
      firstRelativeImport = p;
      return p.value.source.value.startsWith('./');
    })
  return firstRelativeImport;
}

module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Add the styled-jsx import
  const targetImport = findFirstRelative(j, root);
  j(targetImport).insertBefore(
    j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier('flush'))],
      j.literal('styled-jsx/server')
    )
  );

  // Add the appendToHead: flush call to render
  root.find(j.ObjectExpression).filter(p => (
    p.parent.value.type === 'CallExpression' &&
    p.parent.value.callee.type === 'Identifier' &&
    p.parent.value.callee.name === 'render'
  )).forEach(p => {
    j(p).find(j.Property).at(-1).insertAfter(
      j.property(
        'init',
        j.identifier('appendToHead'),
        j.identifier('flush')
      )
    )
  });

  return root.toSource({
    trailingComma: true,
    quote: 'single',
  });
}
