# Git & GitHub Setup untuk Railway Deployment

## 🔴 PENTING: Git Setup

Jika `git init` error di PowerShell, ikuti langkah ini:

### Option 1: Gunakan Command Prompt (Recommended)

```bash
# Buka Command Prompt (bukan PowerShell)
cd C:\xampp2\htdocs\REACT\my-travel-web

# Initialize git
git init

# Check status
git status

# Add semua files
git add .

# Commit
git commit -m "Initial commit: Travel booking app"
```

### Option 2: Atau gunakan Git Bash

- Buka Git Bash (klik kanan di folder → Git Bash Here)
- Jalankan command yang sama

---

## 📋 Full GitHub Setup Steps

### 1. Create GitHub Repository

```
- Buka https://github.com/new
- Repository name: my-travel-web
- Description: Travel booking web application
- Public (agar Railway bisa akses)
- ❌ Jangan centang "Initialize with README"
- Klik "Create repository"
```

### 2. Push Local Repo ke GitHub

Copy-paste commands dari GitHub ke Command Prompt:

```bash
cd C:\xampp2\htdocs\REACT\my-travel-web

# Rename default branch (jika perlu)
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/my-travel-web.git

# Push ke GitHub
git push -u origin main

# Verify
git remote -v
```

### 3. Verify di GitHub

- Buka https://github.com/YOUR_USERNAME/my-travel-web
- Pastikan semua file ada (src/, server/, public/, etc.)

---

## 🚀 Siap untuk Railway!

Setelah GitHub setup selesai:

1. Buka https://railway.app
2. Login dengan GitHub account
3. Follow [RAILWAY_QUICK_SETUP.md](RAILWAY_QUICK_SETUP.md)

---

## 🆘 Troubleshooting

### "git: command not found"
- Install Git from https://git-scm.com/downloads
- Restart terminal

### "permission denied"
- Run Command Prompt as Administrator
- Atau gunakan Git Bash

### "fatal: not a git repository"
- Pastikan di folder `C:\xampp2\htdocs\REACT\my-travel-web`
- Cek ada folder `.git/` (hidden)
- Jika tidak ada, jalankan `git init` lagi

### "HTTP 403 Forbidden"
- Username/password GitHub salah
- Generate Personal Access Token:
  - GitHub → Settings → Developer settings → Personal access tokens
  - Create new token (select `repo` scope)
  - Use token sebagai password saat push

---

**Next**: [RAILWAY_QUICK_SETUP.md](RAILWAY_QUICK_SETUP.md)
