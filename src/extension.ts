import * as vscode from 'vscode'
const extendsName = 'ddll'
/**
 * 插件被激活时触发, 所有代码总入口
 * @param context 插件上下文
 */
export function activate(context: vscode.ExtensionContext) {
  console.log(`您的插件 ${extendsName}, 已被激活`)
  // 普通插件命令
  let disposable = vscode.commands.registerCommand(
    'ddll.helloWorld',
    async (uri) => {
      vscode.window.showInformationMessage(
        `hello 你正在打开, ${uri?.path || '空'}`
      )
      // 执行某一条命令, 后面的俩参数 没有传过去
      vscode.commands.executeCommand('ddll.testEditorCommand', 'a', 'b')
      // 获取所有命令
      // const allCommands = await vscode.commands.getCommands()
      // console.log('所有命令', allCommands)
    }
  )

  // 注册命令, 命令在这里注册, 但是不会执行
  // 执行命令是用户, 通过 ctrl + shift + p 调出命令\窗口, 输入 ddll.helloWorld 执行
  // 插件的命令默认是不激活的, 需要在 package.json 的 activationEvents 中说明有这个命令, 才会被激活
  context.subscriptions.push(disposable)

  // 编辑器插件命令
  const editCommand = vscode.commands.registerTextEditorCommand(
    'ddll.testEditorCommand',
    (textEditor, edit) => {
      // vscode.window.showInformationMessage(`在编辑器中 ${textEditor} + ${edit}`)
      console.log(textEditor, edit)
    }
  )
  context.subscriptions.push(editCommand)
}

// 插件被释放时触发
export function deactivate() {
  console.log(`您的插件 ${extendsName}, 已被释放`)
}
