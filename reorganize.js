const fs = require('fs');
const path = require('path');

const componentsMap = {
  'Navbar.tsx': 'layout/Navbar.tsx',
  'Footer.tsx': 'layout/Footer.tsx',
  'CookieBanner.tsx': 'layout/CookieBanner.tsx',
  'CookiePreferencesModal.tsx': 'layout/CookiePreferencesModal.tsx',
  'Hero.tsx': 'sections/Hero.tsx',
  'NewsletterBox.tsx': 'sections/NewsletterBox.tsx',
  'ContactForm.tsx': 'sections/ContactForm.tsx',
  'RecruitmentForm.tsx': 'sections/RecruitmentForm.tsx',
  'ServiceCard.tsx': 'ui/ServiceCard.tsx',
  'StatsCard.tsx': 'ui/StatsCard.tsx',
  'PortfolioCard.tsx': 'ui/PortfolioCard.tsx',
  'TeamMember.tsx': 'ui/TeamMember.tsx',
  'CookiePreferencesButton.tsx': 'ui/CookiePreferencesButton.tsx',
  'Filigrana.tsx': 'ui/Filigrana.tsx'
};

const rootDir = path.join(__dirname);
const componentsDir = path.join(rootDir, 'components');
const appDir = path.join(rootDir, 'app');

// Create directories
['layout', 'sections', 'ui'].forEach(dir => {
  const dirPath = path.join(componentsDir, dir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

// Move files
for (const [oldName, newPath] of Object.entries(componentsMap)) {
  const oldPath = path.join(componentsDir, oldName);
  const fullNewPath = path.join(componentsDir, newPath);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, fullNewPath);
    console.log(`Moved ${oldName} to ${newPath}`);
  }
}

// Function to recursively find .ts, .tsx files
function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, files);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      files.push(filePath);
    }
  }
  return files;
}

// Update imports in all files
const allFiles = [...getFiles(appDir), ...getFiles(componentsDir)];

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldName, newPath] of Object.entries(componentsMap)) {
    const baseName = oldName.replace('.tsx', '');
    const newBaseName = newPath.replace('.tsx', '');
    
    // Replace exact match: '@/components/Navbar' -> '@/components/layout/Navbar'
    const searchRegex1 = new RegExp(`@/components/${baseName}(['"])`, 'g');
    if (searchRegex1.test(content)) {
      content = content.replace(searchRegex1, `@/components/${newBaseName}$1`);
      changed = true;
    }
    
    // Replace relative match if inside components folder: './Navbar' -> '../layout/Navbar' (simplification, may need exact path)
    const searchRegex2 = new RegExp(`\\./${baseName}(['"])`, 'g');
    if (searchRegex2.test(content) && file.includes('components')) {
      content = content.replace(searchRegex2, `./${newBaseName.split('/')[0]}/${baseName}$1`);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
}

console.log('Component reorganization complete.');
