/**
 * feature:新功能
 * update:更新某功能
 * merge:合并
 * fix:修补某功能的bug
 * refactor:重构某个功能
 * style:仅样式改动
 * docs:仅文档新增/改动
 * test:测试
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feature', 'feat', 'update', 'merge', 'fix', 'refactor', 'style', 'docs', 'test']
    ],
    'scope-enum': [2, 'always', ['pc', 'mobile', 'web']],
    'subject-empty': [0, 'always'],
    'subject-case': [0, 'always']
  }
}
