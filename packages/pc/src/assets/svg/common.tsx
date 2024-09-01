/**
 * 项目常用的 svg 图标
 */

import { useThemeStore } from '@/store/index'

type SvgOption = {
  width?: number | string
  height?: number | string
  fill?: string
}

// 获取指定的 svg 图标
export const getSvg = (name: string, option: SvgOption = {}): string => {
  const themeStore = useThemeStore()
  const width = option.width || 12
  const height = option.height || option.width || 12
  const fill = option.fill || 'var(--jm-color-text-lighter)'
  const svg = svgs[name] || ''
  if (svg) {
    svg.props.width = Number(width) ? themeStore.getRootFontSize(Number(width)) : width
    svg.props.height = Number(height) ? themeStore.getRootFontSize(Number(height)) : height
    if (svg.props?.class && !svg.props.class.includes('shrink-0')) {
      svg.props.class += ' shrink-0'
    }
    if (Array.isArray(svg.children)) {
      svg.children.forEach((item: any) => {
        if (item.props) item.props.fill = fill
      })
    }
  }
  return svg
}

/*
 * 图标集合
 * like 点赞
 * collection 收藏
 * comment 评论
 * delete 删除
 * phone 手机
 * pc 电脑
 * pcManagement 后台管理
 * github GitHub
 * program 小程序
 * source 数据来源
 * time 时间
 * date 日期
 * book 书籍
 * author 作者
 * word 文字
 * fontSize 字体大小
 * professional 职业
 * address 地址
 * remark 备注
 * tag 标签
 * role 角色
 * theme 主题颜色
 * button 按钮
 * api 接口
 * close 关闭
 * closeFull 关闭
 * note 笔记
 */
const svgs: ObjectAny = {
  // 点赞
  like: (
    <svg
      t="1675533681346"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3621"
      id="mx_n_1675533681347"
      width="32"
      height="32"
    >
      <path
        d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z"
        fill="#909399"
        p-id="3622"
      ></path>
      <path
        d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z"
        fill="#909399"
        p-id="3623"
      ></path>
      <path
        d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z"
        fill="#909399"
        p-id="3624"
      ></path>
    </svg>
  ),
  // 收藏
  collection: (
    <svg
      t="1675533858462"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6203"
      width="32"
      height="32"
    >
      <path
        d="M509.606998 143.114488c9.082866 0 17.327644 4.840238 20.996197 12.331863l97.262184 197.441814c5.613858 11.403724 16.663518 19.358907 29.438473 21.216207l223.738737 32.552393c8.420787 1.215688 15.604396 6.851035 18.23327 14.254655 2.520403 7.18361 0.595564 15.062044-5.084808 20.586874L730.253304 601.611947c-8.949836 8.751315-12.994965 21.171182-10.916631 33.370015l38.011732 222.060515c1.325182 7.737218-2.165316 15.426341-8.905834 19.978007-4.088108 2.741437-8.861832 4.155646-13.812587 4.155646-4.022617 0-7.999185-0.972141-11.425214-2.740414L528.149307 775.671215c-5.768377-3.006474-12.155854-4.552689-18.542308-4.552689-6.364965 0-12.727882 1.547239-18.518772 4.552689L296.254819 878.348736c-3.559059 1.855254-7.602142 2.828418-11.668761 2.828418-4.861728 0-9.723455-1.459235-13.546527-4.022617-6.961552-4.684696-10.475586-12.419867-9.127891-20.155039l38.011732-222.016513c2.078335-12.198833-1.988284-24.619724-10.939143-33.370015L125.02397 441.443038c-5.635347-5.492084-7.55814-13.348006-5.061272-20.453844 2.63092-7.481392 9.812483-13.116739 18.298761-14.332427l223.674269-32.552393c12.839423-1.857301 23.867594-9.813506 29.481452-21.216207l97.194646-197.396789C492.325403 147.965983 500.590648 143.114488 509.606998 143.114488M509.606998 104.904235c-24.043602 0-45.922912 13.226233-56.177464 33.95637L356.189863 336.302419l-223.674269 32.54216c-22.983457 3.304256-42.100864 18.718317-49.481971 39.659255-7.381108 21.048385-1.812275 44.23241 14.431687 60.033281l163.916257 160.125931-38.011732 222.016513c-3.868097 22.408359 6.03239 44.819788 25.458835 57.94676 10.69662 7.116071 23.204491 10.784624 35.757388 10.784624 10.298554 0 20.663622-2.475378 30.055526-7.337105l194.987926-102.7205L704.662463 912.072815c9.369392 4.861728 19.712971 7.337105 29.990035 7.337105 12.57541 0 25.082258-3.668553 35.778878-10.784624 19.426445-13.126972 29.305443-35.538401 25.460882-57.94676l-38.012755-222.016513 163.937746-160.125931c16.22145-15.812127 21.810748-38.984896 14.408151-60.033281-7.402597-20.940938-26.51898-36.353976-49.503461-39.659255L663.04767 336.302419l-97.240695-197.441814C555.619962 118.131491 533.695626 104.904235 509.606998 104.904235L509.606998 104.904235z"
        fill="#909399"
        p-id="6204"
      ></path>
    </svg>
  ),
  // 评论
  comment: (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
      <path
        fill="#909399"
        d="M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
      ></path>
      <path
        fill="#909399"
        d="M512 499.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
      ></path>
    </svg>
  ),
  // 删除
  delete: (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
      <path
        fill="#909399"
        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
      ></path>
    </svg>
  ),
  // 手机
  phone: (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
      <path
        fill="#909399"
        d="M224 768v96.064a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V768H224zm0-64h576V160a64 64 0 0 0-64-64H288a64 64 0 0 0-64 64v544zm32 288a96 96 0 0 1-96-96V128a96 96 0 0 1 96-96h512a96 96 0 0 1 96 96v768a96 96 0 0 1-96 96H256zm304-144a48 48 0 1 1-96 0 48 48 0 0 1 96 0z"
      ></path>
    </svg>
  ),
  // 电脑
  pc: (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
      <path
        fill="#909399"
        d="M544 768v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768H192A128 128 0 0 1 64 640V256a128 128 0 0 1 128-128h640a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H544zM192 192a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H192z"
      ></path>
    </svg>
  ),
  // 后台管理
  pcManagement: (
    <svg
      t="1675534364956"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="15977"
      width="32"
      height="32"
    >
      <path
        d="M832 128a64 64 0 0 1 64 64v512a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64h640m0-64H192a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h640a128 128 0 0 0 128-128V192a128 128 0 0 0-128-128zM832 960H192a32 32 0 0 1 0-64h640a32 32 0 0 1 0 64z"
        fill="#909399"
        p-id="15978"
      ></path>
      <path
        d="M761.6 392V384H752a78.4 78.4 0 0 1-65.6-36.8A75.2 75.2 0 0 1 688 272l3.2-6.4-6.4-6.4a252.8 252.8 0 0 0-96-56h-8l-4.8 4.8a72 72 0 0 1-128 0l-4.8-6.4h-8a252.8 252.8 0 0 0-96 56l-6.4 6.4 3.2 6.4a75.2 75.2 0 0 1 1.6 75.2A78.4 78.4 0 0 1 272 384h-8v8A222.4 222.4 0 0 0 256 448a222.4 222.4 0 0 0 6.4 56v8h9.6a78.4 78.4 0 0 1 65.6 36.8A75.2 75.2 0 0 1 336 624l-3.2 6.4 6.4 6.4a252.8 252.8 0 0 0 96 56h8l4.8-4.8a72 72 0 0 1 128 0l4.8 6.4h8a252.8 252.8 0 0 0 96-56l6.4-6.4-3.2-8a75.2 75.2 0 0 1-1.6-75.2A78.4 78.4 0 0 1 752 512h8v-8A222.4 222.4 0 0 0 768 448a222.4 222.4 0 0 0-6.4-56zM584 448a72 72 0 1 1-72-72 72 72 0 0 1 72 72z"
        fill="#909399"
        p-id="15979"
      ></path>
    </svg>
  ),
  // GitHub
  github: (
    <svg
      t="1675534439003"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="17024"
      width="32"
      height="32"
    >
      <path
        d="M938.666667 512a426.666667 426.666667 0 0 1-291.84 404.48 22.186667 22.186667 0 0 1-19.2-2.986667 21.76 21.76 0 0 1-8.96-17.493333v-113.92a170.666667 170.666667 0 0 0-21.333334-87.893333 10.666667 10.666667 0 0 1 0-11.52 11.52 11.52 0 0 1 8.533334-5.973334c104.106667-10.666667 162.133333-52.053333 162.133333-164.693333a200.96 200.96 0 0 0-50.773333-143.36 183.466667 183.466667 0 0 0 8.106666-51.2 184.746667 184.746667 0 0 0-6.4-46.08 20.906667 20.906667 0 0 0-22.613333-15.36 189.866667 189.866667 0 0 0-104.106667 50.346667 422.826667 422.826667 0 0 0-160.426666 0A189.866667 189.866667 0 0 0 327.68 256a20.906667 20.906667 0 0 0-22.613333 15.36A184.746667 184.746667 0 0 0 298.666667 317.44a183.466667 183.466667 0 0 0 8.106666 51.2A200.96 200.96 0 0 0 256 512c0 118.613333 64.426667 158.293333 182.613333 168.106667a158.293333 158.293333 0 0 0-29.44 65.28v5.12a29.013333 29.013333 0 0 0 0 5.973333 25.173333 25.173333 0 0 1-27.306666 21.76 42.666667 42.666667 0 0 1-18.346667-5.12 227.84 227.84 0 0 1-60.586667-53.76 430.506667 430.506667 0 0 0-34.133333-34.56 116.906667 116.906667 0 0 0-25.173333-16.64 20.906667 20.906667 0 0 0-20.48 0 21.333333 21.333333 0 0 0-9.813334 17.92v2.56a21.333333 21.333333 0 0 0 9.813334 17.92 193.706667 193.706667 0 0 1 39.253333 44.8 282.026667 282.026667 0 0 0 67.84 73.386667 105.813333 105.813333 0 0 0 59.733333 17.92h15.36V896a21.76 21.76 0 0 1-8.96 17.493333 22.186667 22.186667 0 0 1-19.2 2.986667A426.666667 426.666667 0 1 1 938.666667 512z"
        p-id="17025"
        fill="#909399"
      ></path>
    </svg>
  ),
  // 小程序
  program: (
    <svg
      t="1675534499669"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="18088"
      width="32"
      height="32"
    >
      <path
        d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m256.717 460.186a151.962 151.962 0 0 1-87.347 65.74 83.251 83.251 0 0 1-24.474 4.096 29.082 29.082 0 0 1 0-58.163 15.667 15.667 0 0 0 6.451-1.229 91.443 91.443 0 0 0 55.91-40.96 75.264 75.264 0 0 0 11.06-39.628c0-45.978-42.496-83.866-94.31-83.866a105.267 105.267 0 0 0-51.2 13.414 81.92 81.92 0 0 0-43.725 70.452v244.224a138.445 138.445 0 0 1-72.704 120.422 159.642 159.642 0 0 1-79.77 20.48c-84.378 0-153.6-63.488-153.6-142.029a136.192 136.192 0 0 1 19.763-69.837 151.962 151.962 0 0 1 87.347-65.74 85.914 85.914 0 0 1 24.474-4.096 29.082 29.082 0 1 1 0 58.163 15.667 15.667 0 0 0-6.451 1.229 95.949 95.949 0 0 0-55.91 40.96 75.264 75.264 0 0 0-11.06 39.628c0 45.978 42.496 83.866 94.925 83.866a105.267 105.267 0 0 0 51.2-13.414 81.92 81.92 0 0 0 43.622-70.452V390.35a138.752 138.752 0 0 1 72.807-120.525 151.245 151.245 0 0 1 79.155-21.504c84.378 0 153.6 63.488 153.6 142.029a136.192 136.192 0 0 1-19.763 69.837z"
        p-id="18089"
        fill="#909399"
      ></path>
    </svg>
  ),
  // 数据来源
  source: (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
      <path
        fill="#909399"
        d="M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496 45.248 45.248zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152 625.152 353.6z"
      ></path>
    </svg>
  ),
  // 时间
  time: (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
      <path
        fill="#909399"
        d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
      ></path>
      <path fill="#909399" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path>
      <path fill="#909399" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path>
    </svg>
  ),
  // 日期
  date: (
    <svg
      t="1679392725680"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2799"
      width="32"
      height="32"
    >
      <path
        d="M791.272727 209.454545h-116.363636V186.181818a23.272727 23.272727 0 0 0-46.545455 0v23.272727H395.636364V186.181818a23.272727 23.272727 0 0 0-46.545455 0v23.272727h-116.363636a93.090909 93.090909 0 0 0-93.090909 93.09091v488.727272a93.090909 93.090909 0 0 0 93.090909 93.090909h558.545454a93.090909 93.090909 0 0 0 93.090909-93.090909V302.545455a93.090909 93.090909 0 0 0-93.090909-93.09091zM186.181818 302.545455a46.545455 46.545455 0 0 1 46.545455-46.545455h116.363636v23.272727a23.272727 23.272727 0 0 0 46.545455 0v-23.272727h232.727272v23.272727a23.272727 23.272727 0 0 0 46.545455 0v-23.272727h116.363636a46.545455 46.545455 0 0 1 46.545455 46.545455v69.818181H186.181818z m651.636364 488.727272a46.545455 46.545455 0 0 1-46.545455 46.545455H232.727273a46.545455 46.545455 0 0 1-46.545455-46.545455V418.909091h651.636364z"
        p-id="2800"
        fill="#909399"
      ></path>
      <path
        d="M302.545455 558.545455h139.636363a23.272727 23.272727 0 0 0 0-46.545455h-139.636363a23.272727 23.272727 0 0 0 0 46.545455zM302.545455 698.181818h139.636363a23.272727 23.272727 0 0 0 0-46.545454h-139.636363a23.272727 23.272727 0 0 0 0 46.545454zM581.818182 558.545455h139.636363a23.272727 23.272727 0 0 0 0-46.545455h-139.636363a23.272727 23.272727 0 0 0 0 46.545455zM581.818182 698.181818h139.636363a23.272727 23.272727 0 0 0 0-46.545454h-139.636363a23.272727 23.272727 0 0 0 0 46.545454z"
        p-id="2801"
        fill="#909399"
      ></path>
    </svg>
  ),
  // 书籍
  book: (
    <svg
      t="1675534706050"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="21146"
      width="32"
      height="32"
    >
      <path
        d="M895.887 166.804c-15.842 0-28.655-12.813-28.655-28.667 0-15.854 12.813-28.667 28.655-28.667 15.854 0 28.667-12.814 28.667-28.667s-12.813-28.667-28.667-28.667H207.953c-47.471 0-85.991 38.485-85.991 86.001v773.925c0 31.662 25.639 57.334 57.323 57.334h687.946c31.685 0 57.322-25.672 57.322-57.334V195.471c0.001-15.854-12.813-28.667-28.666-28.667z m0.619 57.334v706.435H153.309V199.614c4.2 5.765 28.825 24.523 54.644 24.523h109.174v-28.825H207.953c-15.786 0-54.644-11.665-54.644-57.177 0-47.088 38.857-58.123 55.33-58.123h691.92c-12.025 7.026-53.776 11.395-53.776 58.123 0 34.703 42.179 50.601 49.723 57.177H499.68v28.825h396.826z"
        fill="#909399"
        p-id="21147"
      ></path>
      <path
        d="M293.943 52.135v458.63l114.658-114.646 114.657 114.646V52.135H293.943z m203.339 395.621l-88.681-87.916-87.983 87.916V78.798h176.665v368.958z"
        fill="#909399"
        p-id="21148"
      ></path>
    </svg>
  ),
  // 作者
  author: (
    <svg
      t="1675534776636"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="21911"
      width="32"
      height="32"
    >
      <path
        d="M789.504 890.368H319.488c-18.432 0-33.28 14.848-33.28 33.28s14.848 33.28 33.28 33.28h470.016c18.432 0 33.28-14.848 33.28-33.28s-14.848-33.28-33.28-33.28z"
        fill="#909399"
        p-id="21912"
      ></path>
      <path
        d="M731.648 392.192c68.096-118.272 79.36-283.136 79.872-289.792 1.024-12.288-5.632-24.576-16.384-30.72-10.752-6.144-24.064-6.144-34.816 0.512-24.576 15.872-241.152 156.16-287.744 235.52-68.096 114.688-235.52 420.864-237.056 423.936-1.536 2.56-2.048 5.12-3.072 7.68l-91.648 158.72c-9.216 15.872-3.584 36.352 12.288 45.568 5.12 3.072 10.752 4.608 16.384 4.608 11.264 0 22.528-6.144 28.672-16.896L291.84 769.536c58.368-39.936 371.2-258.048 439.808-377.344z m-201.728-51.2c23.04-39.424 122.368-115.2 206.336-173.056-9.216 54.272-27.648 130.56-61.952 190.976-39.936 68.608-190.976 189.952-310.272 278.016 54.272-98.816 126.464-229.376 165.888-295.936z"
        fill="#909399"
        p-id="21913"
      ></path>
    </svg>
  ),
  // 文字
  word: (
    <svg
      t="1675534922013"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="28847"
      width="32"
      height="32"
    >
      <path
        d="M195.828 466.84h212.111l48.61 128.151h79.541l-190.019-486.092h-88.378l-190.019 490.509h79.541l48.61-132.569zM284.207 219.37c4.421-13.255 8.839-26.511 13.259-44.187h4.421c0 4.417 4.417 13.257 13.255 35.349 0 4.421 4.421 8.837 4.421 8.837 0 4.421 26.511 66.287 70.704 190.019h-176.762c48.608-123.732 70.704-185.598 70.704-190.019v0zM284.207 219.37z"
        fill="#909399"
        p-id="28848"
      ></path>
      <path
        d="M544.929 294.496h406.549v61.866h-406.549v-61.866zM544.929 294.496z"
        fill="#909399"
        p-id="28849"
      ></path>
      <path
        d="M67.676 661.275h883.802v61.866h-883.802v-61.866zM67.676 661.275z"
        fill="#909399"
        p-id="28850"
      ></path>
      <path
        d="M544.929 480.091h406.549v61.866h-406.549v-61.866zM544.929 480.091z"
        fill="#909399"
        p-id="28851"
      ></path>
      <path
        d="M67.676 842.453h883.802v61.866h-883.802v-61.866zM67.676 842.453z"
        fill="#909399"
        p-id="28852"
      ></path>
      <path
        d="M544.929 113.32h406.549v61.865h-406.549v-61.865zM544.929 113.32z"
        fill="#909399"
        p-id="28853"
      ></path>
    </svg>
  ),
  // 字体大小
  fontSize: (
    <svg
      t="1679473720144"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3275"
      width="32"
      height="32"
    >
      <path
        d="M24.380952 560.761905h97.52381v-58.514286h112.152381v438.857143h97.523809v-438.857143H438.857143v58.514286h97.523809V404.72381H24.380952z"
        p-id="3276"
        fill="#909399"
      ></path>
      <path
        d="M273.066667 78.019048v175.542857h97.523809V175.542857H585.142857v770.438095h97.52381V175.542857h219.428571v82.895238h97.52381V78.019048z"
        p-id="3277"
        fill="#909399"
      ></path>
    </svg>
  ),
  // 职业
  professional: (
    <svg
      t="1679391303042"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5505"
      width="32"
      height="32"
    >
      <path
        d="M734.536889 654.056324l49.485085-71.326779a49.997 49.997 0 0 0 1.706383-49.826362L602.292263 228.143309z"
        fill="#909399"
        p-id="5506"
      ></path>
      <path
        d="M484.039971 1024c25.254458 0 246.060323-125.419097 251.520747-153.574404 0-22.18297-108.184636-401.853024-180.705882-651.496751l-1.194468-4.095317 142.824196-187.70205c3.071488-3.924679 8.361273-13.309782 5.8017-18.599567-1.023829-2.047659-6.142976-8.531911-31.568072-8.531911H300.603877C280.639205 0.170638 267.6707 4.095317 263.404744 11.091485a20.647225 20.647225 0 0 0 0 17.063822l151.014831 187.019497-1.365106 4.265956C340.362584 468.060657 232.348587 846.87752 232.348587 870.425596c2.388935 28.325946 224.21863 153.574404 251.691384 153.574404zM454.178282 206.130978L313.913659 30.202966h335.645393L513.901661 206.130978c51.191468 194.698217 168.078654 637.163139 168.078654 647.401433 0 6.142976 0 15.528079-194.015664 116.375271l-3.92468 2.218297-3.924679-2.047659C285.92899 872.814531 285.92899 859.334111 285.92899 853.361773c0-13.821696 127.125479-493.144476 168.249292-647.230795z"
        p-id="5507"
        fill="#909399"
      ></path>
    </svg>
  ),
  // 地址
  address: (
    <svg
      t="1679391631127"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7063"
      width="32"
      height="32"
    >
      <path
        d="M416.1536 758.784a113.0496 113.0496 0 0 0 156.0576 35.6352 110.7968 110.7968 0 0 0 35.0208-34.6112l166.5024-223.8464 1.2288-1.8432A313.5488 313.5488 0 0 0 512 50.7904a313.5488 313.5488 0 0 0-262.3488 484.1472zM313.9584 163.84a281.1904 281.1904 0 0 1 397.312 0 283.8528 283.8528 0 0 1 37.4784 354.304l-166.7072 225.28a81.92 81.92 0 0 1-140.4928 0l-166.7072-226.0992A284.2624 284.2624 0 0 1 313.9584 163.84z"
        fill="#909399"
        p-id="7064"
      ></path>
      <path
        d="M512 485.9904a123.904 123.904 0 0 0 0-247.808 124.1088 124.1088 0 0 0-122.88 124.3136 123.904 123.904 0 0 0 122.88 123.4944z m-66.1504-189.6448A93.3888 93.3888 0 0 1 512 268.9024a93.184 93.184 0 1 1 0 186.368 93.3888 93.3888 0 0 1-93.184-92.7744 92.16 92.16 0 0 1 27.4432-66.1504zM819.2 620.9536a15.36 15.36 0 1 0-12.4928 28.0576c72.4992 32.5632 114.8928 76.1856 114.8928 119.6032 0 94.208-187.8016 173.4656-409.6 173.4656S102.4 862.8224 102.4 768.6144c0-42.1888 38.0928-83.5584 107.52-116.1216a15.7696 15.7696 0 0 0 7.3728-20.48 15.36 15.36 0 0 0-20.48-7.3728c-80.6912 38.0928-125.1328 89.088-125.1328 143.36 0 114.688 193.1264 204.8 439.7056 204.8s439.7056-89.9072 439.7056-204.8c0.6144-56.32-46.4896-108.7488-131.8912-147.0464z"
        fill="#909399"
        p-id="7065"
      ></path>
    </svg>
  ),
  // 备注
  remark: (
    <svg
      t="1679391758182"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="8429"
      width="32"
      height="32"
    >
      <path
        d="M167.9 856.1c1.9 0 3.9-0.3 5.8-0.8L431.8 786c3.8-1 7.2-3 10-5.8l528.9-528.9c4.2-4.2 6.5-9.8 6.5-15.7 0-5.9-2.3-11.6-6.5-15.7L781.8 31c-8.7-8.7-22.8-8.7-31.5 0L221.4 559.9c-2.8 2.8-4.7 6.2-5.8 10L146.4 828c-2.1 7.7 0.1 15.9 5.8 21.5 4.2 4.3 9.9 6.6 15.7 6.6z m89.2-268.9l509-509 157.4 157.4-508.9 509-215.1 57.7 57.6-215.1zM1001.7 955H22.3C10 955 0 964.9 0 977.2c0 12.3 10 22.3 22.3 22.3h979.5c12.3 0 22.3-10 22.3-22.3-0.1-12.3-10.1-22.2-22.4-22.2z"
        fill="#909399"
        p-id="8430"
      ></path>
    </svg>
  ),
  // 标签
  tag: (
    <svg
      t="1679391829414"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="9632"
      width="32"
      height="32"
    >
      <path
        d="M753.8 123.4H267.7v174h486.1v-174z m-46 127.9H313.7v-82h394.1v82zM267.7 379.5v520.8l245.4-211.5 243.2 211.9V379.5H267.7z m442.6 420.1L513.3 628 313.8 800V425.5h396.5v374.1z"
        p-id="9633"
        fill="#909399"
      ></path>
    </svg>
  ),
  // 角色
  role: (
    <svg
      t="1679391888423"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="10823"
      width="32"
      height="32"
    >
      <path
        d="M909.6 160.8H114.4c-27.6 0-50 22.4-50 50v601.9c0 27.6 22.4 50 50 50h795.1c27.6 0 50-22.4 50-50V210.8c0.1-27.6-22.3-50-49.9-50zM245.4 788.1c6.7-29.6 21.3-57.6 41.3-78.7 17.5-18.4 47.7-40.3 91.5-40.3 43.9 0 74 21.9 91.5 40.3 20.1 21 34.7 49 41.3 78.7H245.4z m642.2 2.6H584.8c-7.1-49.5-29.3-95.8-62.9-131-38.5-40.4-89.5-62.6-143.6-62.6s-105.1 22.2-143.6 62.6c-33.6 35.2-55.8 81.5-62.9 131h-35.4V232.8h751.2v557.9z"
        p-id="10824"
        fill="#909399"
      ></path>
      <path
        d="M378.3 566.3c73.4 0 133.2-59.8 133.2-133.2s-59.8-133.2-133.2-133.2-133.2 59.8-133.2 133.2 59.8 133.2 133.2 133.2z m0-194.4c33.7 0 61.2 27.5 61.2 61.2s-27.5 61.2-61.2 61.2-61.2-27.5-61.2-61.2 27.5-61.2 61.2-61.2zM654 635h140.3c19.9 0 36-16.1 36-36s-16.1-36-36-36H654c-19.9 0-36 16.1-36 36s16.1 36 36 36zM654 466.9h140.3c19.9 0 36-16.1 36-36s-16.1-36-36-36H654c-19.9 0-36 16.1-36 36s16.1 36 36 36z"
        p-id="10825"
        fill="#909399"
      ></path>
    </svg>
  ),
  // 主题颜色
  theme: (
    <svg
      t="1679473587505"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2802"
      width="32"
      height="32"
    >
      <path
        d="M515.100444 911.758222c-161.393778 0-260.494222-23.495111-302.990222-71.793778-22.442667-25.486222-21.333333-49.521778-20.48-56.291555 0.455111-6.030222 15.530667-189.923556 28.216889-275.655111-4.608-3.128889-14.392889-7.054222-20.053333-9.329778a229.831111 229.831111 0 0 1-13.880889-5.888c-18.716444-8.789333-57.571556-28.046222-57.571556-28.046222-48.298667-22.186667-76.942222-50.403556-83.996444-83.399111-5.660444-26.424889 3.982222-49.180444 14.876444-61.696 1.308444-1.479111 2.702222-2.872889 4.181334-4.124445l227.072-193.735111a39.907556 39.907556 0 0 1 63.800889 17.607111c24.888889 73.699556 97.024 84.736 137.841777 84.736 10.865778 0 17.777778-0.853333 17.834667-0.881778 3.441778-0.426667 7.111111-0.426667 10.552889 0.028445 0 0 6.769778 0.824889 17.265778 0.824889 40.021333 0 110.791111-10.979556 135.253333-84.565334a39.964444 39.964444 0 0 1 64.085333-17.607111l223.800889 193.735111c1.479111 1.28 2.872889 2.673778 4.124445 4.152889 10.780444 12.515556 20.280889 35.299556 14.592 61.639111-7.054222 32.824889-35.299556 60.984889-83.939556 83.626667 0 0.028444-37.489778 18.887111-55.694222 27.562667-4.096 1.934222-8.760889 3.868444-13.710222 5.888-5.518222 2.247111-15.104 6.144-19.598223 9.244444 12.572444 86.471111 27.392 269.880889 28.017778 277.703111 0.682667 5.006222 1.735111 29.184-20.878222 54.812445-42.325333 48.099556-140.032 71.452444-298.723556 71.452444z m-243.541333-125.354666c6.712889 7.936 48.952889 45.425778 243.541333 45.425777 192.227556 0 233.187556-37.575111 239.530667-45.312-2.986667-35.925333-16.384-195.242667-27.249778-268.686222-9.102222-61.582222 47.530667-84.593778 68.835556-93.240889 3.413333-1.393778 6.656-2.673778 9.472-4.010666 17.92-8.533333 55.096889-27.249778 55.153778-27.278223 24.462222-11.434667 34.474667-20.565333 38.4-25.287111l-175.36-151.779555c-52.792889 78.193778-144.355556 87.808-186.083556 87.808-9.927111 0-17.834667-0.540444-22.698667-0.967111a255.601778 255.601778 0 0 1-22.983111 0.967111c-42.325333 0-135.253333-9.671111-188.643555-88.291556l-178.488889 152.291556c4.067556 4.750222 14.108444 13.710222 37.831111 24.604444 1.137778 0.540444 38.855111 19.285333 57.059556 27.818667 2.872889 1.336889 6.172444 2.645333 9.642666 4.039111 21.589333 8.647111 78.904889 31.601778 69.660445 93.411555-11.178667 74.24-24.945778 236.344889-27.619556 268.487112z"
        fill="#909399"
        p-id="2803"
      ></path>
    </svg>
  ),
  // 按钮
  button: (
    <svg
      t="1722162332107"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4244"
      width="32"
      height="32"
    >
      <path
        d="M368 518.4c-3.2-6.4-6.4-9.6-12.8-16-3.2-3.2-9.6-6.4-12.8-9.6 3.2-3.2 6.4-3.2 6.4-6.4 3.2-3.2 3.2-6.4 6.4-9.6 0-3.2 3.2-6.4 3.2-12.8v-12.8c0-9.6-3.2-19.2-6.4-28.8-3.2-9.6-9.6-16-12.8-22.4-6.4-6.4-12.8-9.6-19.2-12.8-6.4-3.2-16-3.2-22.4-3.2H224v252.8h80c9.6 0 19.2-3.2 28.8-6.4 9.6-3.2 16-9.6 22.4-16 6.4-6.4 12.8-16 16-25.6 3.2-9.6 6.4-19.2 6.4-32 0-6.4 0-16-3.2-22.4s-3.2-12.8-6.4-16z m-96-89.6h16c6.4 0 12.8 3.2 16 6.4 6.4 3.2 6.4 9.6 6.4 19.2s-3.2 16-6.4 19.2c-3.2 6.4-9.6 6.4-16 6.4h-16v-51.2z m54.4 144c-3.2 3.2-3.2 6.4-6.4 9.6-3.2 3.2-6.4 3.2-9.6 6.4-3.2 0-6.4 3.2-12.8 3.2H272v-64h25.6c9.6 0 16 3.2 22.4 9.6 6.4 6.4 9.6 12.8 9.6 25.6 0 0-3.2 6.4-3.2 9.6zM748.8 480v48c-6.4-6.4-9.6-16-16-25.6-6.4-9.6-12.8-16-19.2-22.4L640 384h-41.6v252.8h51.2v-160l19.2 28.8c6.4 9.6 12.8 19.2 22.4 28.8l83.2 108.8H800v-256h-51.2V480z"
        fill="#4e8e2f"
        p-id="4245"
      ></path>
      <path
        d="M896 224H128c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V288c0-35.2-28.8-64-64-64z m0 480c0 19.2-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V320c0-19.2 12.8-32 32-32h704c19.2 0 32 12.8 32 32v384z"
        fill="#4e8e2f"
        p-id="4246"
      ></path>
      <path d="M393.6 432h64v204.8H512V432h64v-48H393.6z" fill="#4e8e2f" p-id="4247"></path>
    </svg>
  ),
  // api接口
  api: (
    <svg
      t="1722165113856"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="19329"
      width="32"
      height="32"
    >
      <path
        d="M316.032 472.448l-25.941333 82.517333h54.442666l-25.344-82.517333h-3.157333z"
        fill="#000000"
        p-id="19330"
      ></path>
      <path
        d="M836.906667 256H187.093333C154.453333 256 128 280.832 128 311.466667v443.733333c0 30.634667 26.453333 55.466667 59.093333 55.466667h649.813334c15.658667 0 30.72-5.845333 41.813333-16.213334 11.050667-10.453333 17.28-24.576 17.28-39.253333V311.466667c0-14.677333-6.229333-28.8-17.322667-39.253334a61.098667 61.098667 0 0 0-41.813333-16.213333zM370.602667 644.309333l-14.677334-48.768H278.869333L263.637333 644.266667H203.818667L283.136 422.4h73.642667l79.402666 221.952H370.645333z m211.754666-65.152h-39.765333v65.152h-60.074667V422.4h103.424a82.858667 82.858667 0 0 1 61.44 21.376 72.533333 72.533333 0 0 1 23.722667 57.429333c0 47.232-35.669333 77.994667-88.746667 77.994667z m226.005334 65.152h-60.074667V422.4h60.074667V644.266667z"
        fill="#000000"
        p-id="19331"
      ></path>
      <path
        d="M570.154667 465.749333h-27.434667v70.912h27.434667c25.514667 0 41.130667-12.842667 41.130666-35.413333 0-22.485333-15.786667-35.498667-41.130666-35.498667z"
        fill="#000000"
        p-id="19332"
      ></path>
    </svg>
  ),
  // 关闭
  close: (
    <svg
      t="1722443985780"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4256"
      width="32"
      height="32"
    >
      <path
        d="M512 466.944l233.472-233.472a31.744 31.744 0 0 1 45.056 45.056L557.056 512l233.472 233.472a31.744 31.744 0 0 1-45.056 45.056L512 557.056l-233.472 233.472a31.744 31.744 0 0 1-45.056-45.056L466.944 512 233.472 278.528a31.744 31.744 0 0 1 45.056-45.056z"
        fill="#5A5A68"
        p-id="4257"
      ></path>
    </svg>
  ),
  // 关闭
  closeFull: (
    <svg
      t="1722445925598"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5567"
      id="mx_n_1722445925598"
      width="32"
      height="32"
    >
      <path
        d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM305.956571 370.395429L447.488 512 305.956571 653.604571a45.568 45.568 0 1 0 64.438858 64.438858L512 576.512l141.604571 141.531429a45.568 45.568 0 0 0 64.438858-64.438858L576.512 512l141.531429-141.604571a45.568 45.568 0 1 0-64.438858-64.438858L512 447.488 370.395429 305.956571a45.568 45.568 0 0 0-64.438858 64.438858z"
        fill="#000000"
        p-id="5568"
      ></path>
    </svg>
  ),
  // 笔记
  note: (
    <svg
      t="1725165061849"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="8522"
      id="mx_n_1725165061850"
      width="32"
      height="32"
    >
      <path
        d="M1019.618 772.892a36.523 36.523 0 0 1-36.523 36.523H690.231a36.523 36.523 0 0 1-36.58-36.466 36.523 36.523 0 0 1 36.58-36.522h292.75a36.523 36.523 0 0 1 36.637 36.409m4.551 214.584a36.466 36.466 0 0 1-36.466 36.58H402.43a36.523 36.523 0 0 1-36.58-36.466 36.58 36.58 0 0 1 36.58-36.58h585.16a36.523 36.523 0 0 1 36.579 36.523M640.453 279.893a31.8 31.8 0 0 1 7.168 44.374L349.98 736.882a31.744 31.744 0 0 1-51.655-36.864l297.642-412.672a31.744 31.744 0 0 1 44.487-7.453zM795.646 150.3L605.524 10.24a52.508 52.508 0 0 0-73.444 11.378l-15.53 21.106L791.208 245.02l15.53-21.105a52.452 52.452 0 0 0-10.638-73.046h-0.455zM52.621 671.858l274.602 202.354 442.198-599.837L494.76 72.021zM0.226 1001.813a18.83 18.83 0 0 0 26.51 19.513l241.835-105.529L29.353 739.442C20.365 819.2 1.534 988.729 0.169 1001.756z"
        p-id="8523"
        fill="#2c2c2c"
      ></path>
    </svg>
  )
}
