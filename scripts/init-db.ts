import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Crea o recupera il ruolo admin
  let adminRole = await prisma.role.findUnique({
    where: { name: 'admin' }
  })
  
  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'admin',
        description: 'Amministratore completo del sistema',
        isSystem: true
      }
    })
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jeins.it' },
    update: {},
    create: {
      email: 'admin@jeins.it',
      username: 'admin',
      name: 'Admin JEIns',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  })

  // Create default contacts
  const defaultContacts = [
    { type: 'email', value: 'jeinsubria@gmail.com', label: 'Email principale' },
    { type: 'phone', value: '+39 3298999219', label: 'Telefono' },
    { type: 'address', value: 'Via Stefano da Seregno n.31, 20831 Seregno (MB)', label: 'Sede legale' },
    { type: 'facebook', value: 'https://www.facebook.com/jeinsubria', label: 'Facebook' },
    { type: 'instagram', value: 'https://www.instagram.com/jeinsubria', label: 'Instagram' },
    { type: 'linkedin', value: 'https://linkedin.com/company/jeinsubria', label: 'LinkedIn' },
  ]

  for (const contact of defaultContacts) {
    await prisma.contact.upsert({
      where: { 
        type_value: { 
          type: contact.type, 
          value: contact.value 
        } 
      },
      update: {},
      create: {
        type: contact.type,
        value: contact.value,
        label: contact.label,
        order: defaultContacts.indexOf(contact),
      },
    })
  }

  // Create default policies
  const defaultPolicies = [
    {
      type: 'privacy',
      title: 'Privacy Policy',
      content: 'Inserisci qui il contenuto della privacy policy...',
      version: '1.0'
    },
    {
      type: 'cookie',
      title: 'Cookie Policy',
      content: 'Inserisci qui il contenuto della cookie policy...',
      version: '1.0'
    },
    {
      type: 'terms',
      title: 'Termini e Condizioni',
      content: 'Inserisci qui i termini e condizioni...',
      version: '1.0'
    }
  ]

  for (const policy of defaultPolicies) {
    await prisma.policy.upsert({
      where: { 
        type_version: { 
          type: policy.type, 
          version: policy.version 
        } 
      },
      update: {},
      create: {
        type: policy.type,
        title: policy.title,
        content: policy.content,
        version: policy.version,
      },
    })
  }

  console.log('Database initialized successfully!')
  console.log('Admin user created: admin@jeins.it / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
