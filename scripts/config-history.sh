#!/bin/bash
# 配置历史管理工具
# 用法: ./scripts/config-history.sh [list|restore <timestamp>|diff <timestamp>]

BACKUP_DIR=".config-backups"

# 列出所有备份
list_backups() {
  echo "📦 配置历史备份列表："
  echo ""
  if [ ! -d "$BACKUP_DIR" ]; then
    echo "  暂无备份记录"
    return
  fi
  
  ls -1 "$BACKUP_DIR" | grep -v "latest" | sort -r | while read timestamp; do
    if [ -d "$BACKUP_DIR/$timestamp" ]; then
      file_count=$(find "$BACKUP_DIR/$timestamp" -type f | wc -l)
      date_str=$(echo "$timestamp" | sed 's/_/ /; s/\([0-9]\{4\}\)\([0-9]\{2\}\)\([0-9]\{2\}\)/\1-\2-\3/')
      echo "  📁 $timestamp  ($file_count 个文件)"
    fi
  done
  echo ""
  echo "💡 使用 ./scripts/config-history.sh restore <timestamp> 恢复指定版本"
}

# 恢复指定版本
restore_backup() {
  local timestamp=$1
  if [ -z "$timestamp" ]; then
    echo "❌ 请指定备份时间戳"
    list_backups
    return 1
  fi
  
  if [ ! -d "$BACKUP_DIR/$timestamp" ]; then
    echo "❌ 找不到备份: $timestamp"
    list_backups
    return 1
  fi
  
  echo "🔄 正在恢复配置: $timestamp"
  echo ""
  
  # 统计恢复的文件
  local restored=0
  find "$BACKUP_DIR/$timestamp" -type f | while read backup_file; do
    # 获取相对路径
    local rel_path=${backup_file#$BACKUP_DIR/$timestamp/}
    local target_file="$rel_path"
    
    # 创建目录并复制
    mkdir -p "$(dirname "$target_file")"
    cp "$backup_file" "$target_file"
    echo "  ✅ $rel_path"
    restored=$((restored + 1))
  done
  
  echo ""
  echo "✅ 配置已恢复，请提交更改: git add -A && git commit -m 'restore: 恢复配置 $timestamp'"
}

# 对比指定版本与当前版本
diff_backup() {
  local timestamp=$1
  if [ -z "$timestamp" ]; then
    echo "❌ 请指定备份时间戳"
    list_backups
    return 1
  fi
  
  if [ ! -d "$BACKUP_DIR/$timestamp" ]; then
    echo "❌ 找不到备份: $timestamp"
    return 1
  fi
  
  echo "📊 对比当前配置与备份: $timestamp"
  echo ""
  
  find "$BACKUP_DIR/$timestamp" -type f | while read backup_file; do
    local rel_path=${backup_file#$BACKUP_DIR/$timestamp/}
    if [ -f "$rel_path" ]; then
      if ! diff -q "$backup_file" "$rel_path" > /dev/null 2>&1; then
        echo "📝 $rel_path (有变更)"
        diff --color=always "$backup_file" "$rel_path" | head -20
        echo "  ..."
        echo ""
      fi
    else
      echo "🗑️  $rel_path (当前已删除)"
    fi
  done
}

# 主逻辑
case "${1:-list}" in
  list|ls)
    list_backups
    ;;
  restore|revert)
    restore_backup "$2"
    ;;
  diff)
    diff_backup "$2"
    ;;
  *)
    echo "配置历史管理工具"
    echo ""
    echo "用法:"
    echo "  ./scripts/config-history.sh list              - 列出所有备份"
    echo "  ./scripts/config-history.sh restore <时间戳>   - 恢复指定版本"
    echo "  ./scripts/config-history.sh diff <时间戳>      - 对比差异"
    ;;
esac
