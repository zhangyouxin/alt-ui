import { Document, HeadingLevel, Paragraph, Packer } from 'docx'
import { saveAs } from 'file-saver'

export class DocumentCreator {
  create(data) {
    const document = new Document()

    document.addSection({
      children: [
        new Paragraph({
          text: '实验结果',
          heading: HeadingLevel.TITLE,
        }),
        ...Object.keys(data).map((key) => {
          return this.createBullet(`${key}: ${data[key]}`)
        }),
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

  generate(data) {
    const documentCreator = new DocumentCreator()
    const doc = documentCreator.create(data)

    Packer.toBlob(doc).then((blob) => {
      console.log(blob)
      saveAs(blob, 'data.docx')
      console.log('Document created successfully')
    })
  }
}
