import {
  Document,
  HeadingLevel,
  Paragraph,
  Packer,
  Media,
  // Table,
  // TableRow,
  // TableCell,
} from 'docx'
import { saveAs } from 'file-saver'

export class DocumentCreator {
  create(data, invalidCurve, dataSource) {
    const document = new Document()
    const invalidCurveImage = Media.addImage(
      document,
      Uint8Array.from(atob(invalidCurve), (c) => c.charCodeAt(0)),
      1357,
      400
    )
    const inputParamObj = JSON.parse(dataSource[2].value)
    const inputStresses = inputParamObj.stresses

    // eslint-disable-next-line no-unused-vars
    // const inputParamTabile = new Table({
    //   rows: [
    //     ...inputParamObj.stresses.map((stress) => {
    //       return new TableRow({
    //         children: [
    //           new TableCell({
    //             children: [new Paragraph('Hello')],
    //           }),
    //           new TableCell({
    //             children: [new Paragraph('world')],
    //           }),
    //         ],
    //       })
    //     }),
    //   ],
    // })

    document.addSection({
      children: [
        new Paragraph({
          text: '实验概览',
          heading: HeadingLevel.HEADING_1,
        }),
        ...dataSource.map((item) => {
          if (item.key !== 'params') {
            return this.createBullet(`${item.attr}: ${item.value}`)
          }
        }),
        new Paragraph({
          text: '实验参数',
          heading: HeadingLevel.HEADING_1,
        }),
        ...Object.keys(inputParamObj).map((key) => {
          if (key !== 'stresses') {
            return this.createBullet(`${key}: ${inputParamObj[key]}`)
          }
        }),
        ...inputStresses.map((key, index) => {
          return this.createBullet(
            `输入应力${index + 1}:  ${JSON.stringify(key, null, 2)}`
          )
        }),
        // inputParamTabile,
        new Paragraph({
          text: '实验结果',
          heading: HeadingLevel.HEADING_1,
        }),
        ...Object.keys(data).map((key) => {
          return this.createBullet(`${key}: ${data[key]}`)
        }),
        new Paragraph({
          text: `\t实验图例`,
          heading: HeadingLevel.HEADING_1,
          style: { color: 'black' },
        }),
        new Paragraph({
          text: '加速失效曲线',
        }),
        new Paragraph(invalidCurveImage),
      ],
    })
    return document
  }

  createBullet(text) {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    })
  }

  createSubBullet(text) {
    return new Paragraph({
      text: text,
      bullet: {
        level: 1,
      },
    })
  }

  generate(data, invalidCurve, dataSource) {
    const documentCreator = new DocumentCreator()
    const doc = documentCreator.create(data, invalidCurve, dataSource)
    console.log('dataSource', dataSource)
    Packer.toBlob(doc).then((blob) => {
      console.log(blob)
      saveAs(blob, 'data.docx')
      console.log('Document created successfully')
    })
  }
}
